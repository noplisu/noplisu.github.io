---
title: "Micro RAG: Chunking, retrieval, and grounded answers without a vector database"
description: "How I built a from-scratch RAG demo over three Project Gutenberg books—structure-aware chunking, file-backed embeddings, brute-force cosine search, and citation grounding checks."
excerpt: "Bookmantic already retrieves by meaning. Here is what happens when you add generation over full book text: recursive chunking, a numpy index, and a grounding check that turns citations into something measurable."
author: "Grzegorz Lisowski"
publishedAt: "2026-09-07T00:00:00.000Z"
updatedAt: "2026-09-07T00:00:00.000Z"
tags: ["AI", "RAG", "Python", "Embeddings", "Chunking"]
category: "case-study"
featured: true
readingTime: 10
slug: "micro-rag"
image: "/articles/micro-rag/card.webp"
---

## Introduction: Retrieval augmented generation

![Wooden library bookshelves filled with books](/articles/micro-rag/card.webp)

In [Beyond Keywords: Implementing Semantic Search in Bookmantic](/blog/implementing-semantic-search-in-bookmantic), retrieval already works: embed a query, find nearest neighbors, return books by meaning. That catalog is ~45k short blurbs. Full book text breaks the assumption immediately. A 300-page novel is neither one document nor one embedding per sentence. You need chunks that respect structure, then a generation step that is honest about what those chunks actually contain.

That is the gap this piece fills. [micro-rag](https://github.com/noplisu/micro-rag) is a small, from-scratch retrieval-augmented generation demo over three Project Gutenberg texts—*Pride and Prejudice*, *Crime and Punishment*, and *The Odyssey*. No web framework and no vector database: chunks and embeddings live in files, and search is a brute-force cosine similarity over an in-memory matrix.

The corpus is deliberate. Austen splits on `Chapter …`. Dostoevsky nests `PART …` and `CHAPTER …` (plus an epilogue). Homer uses `BOOK …` and long verse paragraphs. One regex does not cover all three. That stress-test is the point: if chunking only works on tidy chapter novels, it is not a general strategy.

I skip implementing the naive fixed-size character splitter. Most tutorials start there, then discover that models count tokens and books have headings. This project starts where that lesson usually ends: structure-aware recursive chunking, then retrieval, then grounded generation.

---

## Chunking

Models see tokens, not characters. The chunker budgets with `tiktoken` (`cl100k_base`) so a “500-token chunk” means something the embedding model can actually take.

The first problem is structural markers. Each book gets its own splitter:

```python
BOOK_CONFIGS: list[BookConfig] = [
    BookConfig(
        filename="PrideAndPrejudice.txt",
        book_title="Pride and Prejudice",
        split_sections=split_pride_and_prejudice,
    ),
    BookConfig(
        filename="CrimeAndPunishment.txt",
        book_title="Crime and Punishment",
        split_sections=split_crime_and_punishment,
    ),
    BookConfig(
        filename="TheOdyssey.txt",
        book_title="The Odyssey",
        split_sections=split_odyssey,
    ),
]
```

Within each section the strategy is recursive: pack paragraphs under the token budget; only if a single paragraph overflows, fall back to sentence packing; only if a sentence still overflows, hard-split on tokens. Austen’s clipped dialogue rarely needs the fallback. Odyssey verse paragraphs hit sentence packing far more often.

Overlap is a separate pass. After chunks exist, the last `overlap_tokens` of chunk *N* are prepended to chunk *N+1*. That is the fix for a fact stated near a boundary: without overlap, the sentence that answers the question can land in the wrong neighbor and never make the top-*k*.

```python
def apply_overlap(
    chunks: list[str],
    overlap_tokens: int,
    enc: tiktoken.Encoding | None = None,
) -> list[str]:
    """Prepend the tail tokens of chunk N to the start of chunk N+1."""
    ...
```

Metadata is not an afterthought. Every chunk record carries `text`, `book_title`, `chapter`, and a global `chunk_index`. Generation cites as `[Book Title, Chapter]`; grounding can only verify what retrieval actually returned.

Defaults: `--chunk-size 500`, `--overlap-tokens 50`. At those settings the three books produce **1,565** chunks.

---

## Semantic search

Embeddings reuse the same model as Bookmantic: `text-embedding-3-small` at 1536 dimensions. Run once via `python -m embedding.build`, cost is pennies, never repeated on the query path—the same [backfill lesson](/blog/implementing-semantic-search-in-bookmantic) as Sidekiq embedding jobs for 45k books.

Where vectors persist is intentionally boring:

- `data/embeddings.npy` — float32 matrix, one L2-normalized row per chunk
- `data/chunks.jsonl` — text plus metadata, one object per line

No Postgres, no pgvector, no HNSW. At ~45k rows, HNSW in Bookmantic was already borderline overkill for latency. At a few thousand chunks, brute-force cosine similarity is one matrix multiply.

```python
class VectorIndex:
    def search(
        self, query_vector: np.ndarray, k: int = 5
    ) -> list[dict[str, Any]]:
        """Return top-k chunks by cosine similarity (normalized dot product)."""
        q = np.asarray(query_vector, dtype=np.float32).reshape(-1)
        ...
        scores = self.embeddings @ q
        top_idx = np.argpartition(-scores, k - 1)[:k]
        top_idx = top_idx[np.argsort(-scores[top_idx])]
        ...
```

At query time the CLI re-embeds the question fresh each call. There is no query cache. Caching is real product work; it is out of scope here so the retrieval path stays readable end to end.

---

## Generation

Retrieved chunks become context with source tags inline, so the model has something concrete to cite:

```text
Excerpt 1 — [Pride and Prejudice, Chapter XIX] (score=0.6585)
...
```

The system prompt is short and strict: answer only from the provided excerpts, cite as `[Book Title, Chapter]`, say when the corpus lacks the answer, and flag conflicts between sources instead of silently picking a side.

```python
SYSTEM_PROMPT = """You are a careful literary assistant answering questions about a small corpus of classic books.

Rules:
- Answer ONLY using the provided excerpts. Do not use outside knowledge.
- Cite every factual claim with a source in the form [Book Title, Chapter], using the exact book title and chapter labels from the excerpts.
- If the excerpts do not contain enough information to answer, say so clearly.
- If excerpts from different sources conflict, flag the conflict and present both sides instead of picking one.
"""
```

Chat calls use `gpt-4o-mini` at `temperature=0.2`. Grounded QA wants low variance; creativity is not the product.

After the answer comes `check_grounding()`: parse every `[Book Title, Chapter]` citation and verify it matches a chunk that was actually retrieved. “The model cited its sources” stops being a vibe and becomes a list of unmatched strings—or an empty list.

```python
def check_grounding(
    answer: str, retrieved_chunks: list[dict[str, Any]]
) -> list[str]:
    """Return citation strings that do not match any retrieved chunk."""
    allowed = {
        (_norm(c["book_title"]), _norm(c["chapter"])) for c in retrieved_chunks
    }
    ...
```

A mismatch can mean two different failures. A formatting slip (two chapters jammed into one bracket with a semicolon) is different from a fabricated source that never appeared in the context. Both fail the check; only the second is a classic hallucination. The CLI prints unmatched citations as grounding warnings and still shows the answer—it does not silently strip citations and pretend the response is clean.

---

## Guardrails

What this pipeline deliberately does not do: no reranking, no multi-hop reasoning, no chunk-level fact verification beyond source matching. The ceiling is *k* retrieved chunks (default 5). That is a scope limit, not a tuning afterthought. Refusal is designed behavior: if the corpus cannot answer, saying so is a success.

Downstream, an invalid citation should be flagged, not deleted. Presenting a cleaned answer as grounded would hide the failure mode you care about measuring.

The CLI mirrors the harness shape from [Harnessing AI: Build your own coding agent](/blog/harnessing-ai): `-p` for one shot, `-i` for an interactive REPL. Same convention, different job.

```bash
python -m prompt.cli -p "Why does Elizabeth refuse Mr Collins?"
python -m prompt.cli -i
```

---

## The Results: talk with docs

Three shapes matter: a clean win, a refusal, and a cross-book contrast. All of the following ran against the default 500-token index.

**Clean win.** *Why does Elizabeth refuse Mr Collins?* Top hit is Chapter XIX at cosine similarity ~0.66. The model quotes her refusal—“You could not make *me* happy…”—and cites `[Pride and Prejudice, Chapter XIX]`. Grounding: all citations match.

**Refusal.** *What year was the iPhone first released?* Retrieved scores collapse to ~0.08–0.11 of unrelated literary text. The model declines instead of inventing a date from noise. Grounding still passes: there are no fake citations to check.

**Conflict / contrast.** *How do guests and hosts treat strangers who arrive seeking shelter or hospitality?* Top-*k* mixes *Crime and Punishment* and *The Odyssey*. The answer presents Odyssey’s divine hospitality duty alongside a more personal offer of help in Dostoevsky, and notes that the sources do not share the same framing. That is the “flag the conflict” instruction firing—not a perfect philosophical debate, but an honest multi-source response instead of a single blended voice.

Grounding also caught a real formatting failure on a different murder/guilt question: the model emitted `[Crime and Punishment, Part III, Chapter V; Part III, Chapter V]`—two labels mashed into one citation. The chapter was retrieved; the citation string was not. That is the formatting-slip failure shape, and it showed up as a warning rather than a silent pass.

### Chunk-size sweep

Same three questions at 300, 500, and 800 tokens (overlap 50 / 50 / 80). Corpus size changes a lot; answer quality changes more subtly.

| Chunk size | Chunks | Elizabeth top score | Grounding (all 3 Qs) | Hospitality sources in top-5 |
| ---------- | ------ | ------------------- | -------------------- | ---------------------------- |
| 300        | 2,755  | 0.668               | all match            | Odyssey only                 |
| 500        | 1,565  | 0.659               | all match            | Crime and Punishment + Odyssey |
| 800        | 944    | 0.654               | all match            | Odyssey only                 |

All three sizes answered Elizabeth correctly and refused the iPhone question. The interesting difference is the hospitality prompt: only the 500-token index pulled both books into the top five. At 300, retrieval locked onto dense Odyssey hospitality passages (higher precision, narrower shelf). At 800, larger chunks diluted cross-book ranking the other way. Default 500 is not magic—it is the setting where this particular contrast question stayed multi-source without changing *k*.

---

## Lessons Learned

**One regex per book was non-negotiable.** Gutenberg formatting does not generalize. Another “ETL is the product” moment, same family as cleaning Open Library for Bookmantic: the vectors will do their job if the splitters give them coherent sections.

**Overlap earns its keep at boundaries.** Without the post-pass, a fact that straddles two chunks competes against neighbors that each hold half the story. With it, the answering sentence rides into the next window.

**Chunk size trades precision for completeness—and for multi-source recall.** Smaller chunks scored slightly higher on the Elizabeth question and clung to Odyssey for hospitality. Larger chunks answered with more surrounding prose but fewer distinct sources in top-*k*. Mid-size won the cross-book case on this corpus.

**Malformed citations happen even when the source is present.** The semicolon mash-up is not a fabricated chapter; it is the model failing the citation grammar. Treat that as a first-class failure: flag it, do not normalize it away.

**Forcing the conflict case teaches retrieval tuning.** “Compare guilt across these books” mostly retrieved Crime and Punishment plus one Austen chunk. Broad thematic prompts need either a better query, a larger *k*, or a chunk size that does not collapse diversity. The hospitality wording worked; vague comparative wording did not.

---

## Conclusion

Retrieval from Bookmantic, plus generation and grounding, is now a complete RAG pipeline you can read in an afternoon. It is still just a function you call yourself: embed the question, search, complete, check citations.

That shape is a natural tool for [Fractal Engine](https://github.com/noplisu/fractal-engine). The CLI already shares the `-p` / `-i` convention from the [harnessing AI](/blog/harnessing-ai) article. Dropping this in as a named tool with a JSON schema is the obvious next step: the model decides *when* to retrieve, instead of you deciding it on every call. That is what “agentic” adds—and what this piece deliberately does not have yet.

The code is on [GitHub](https://github.com/noplisu/micro-rag). Build the index once, ask a question you know the books can answer, then ask one they cannot. Watch the grounding line. That is the shortest path from “RAG” as a slogan to a pipeline you can measure.
