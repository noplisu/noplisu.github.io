---
title: "Agentic RAG: Let the model decide when to retrieve"
description: "How I wired micro-rag into Fractal Engine as Index, Retrieve, and CheckGrounding tools so the agent loop chooses when to build an index, pull chunks, and validate citations instead of calling RAG once and hoping."
excerpt: "Naive RAG is a function you call. Agentic RAG is a loop that can retrieve again. Here is how I connected a from-scratch index to a coding agent without merging the two into a new product."
author: "Grzegorz Lisowski"
publishedAt: "2026-09-15T00:00:00.000Z"
updatedAt: "2026-09-15T00:00:00.000Z"
tags: ["AI", "RAG", "Agent", "Python", "Embeddings"]
category: "case-study"
featured: true
readingTime: 10
slug: "agentic-rag"
image: "/articles/agentic-rag/card.webp"
---

## Introduction: Who decides to retrieve

![Person standing in a library aisle choosing among the shelves](/articles/agentic-rag/card.webp)

[Micro RAG](/blog/micro-rag) already has the pipeline: structure-aware chunks, a numpy cosine index, a grounded generate step, and a citation check. You call it. One question becomes one embedding, one top-*k*, one completion. That is **naive RAG**, and it is the right shape when the query is good and the answering sentence sits in the first five chunks.

It is the wrong shape the moment the first retrieve misses. A vague prompt, a comparison that lives in two chapters, a citation the model formats badly. None of those get a second look. The function has already returned.

[Fractal Engine](/blog/harnessing-ai) is the other half of the series: a coding-agent harness. Call the model; if it returns tool calls, run them, append results, call again. The model already decides when to Grep, when to Read, when to stop.

The obvious next step, which the micro-rag conclusion already named, is to make retrieval a tool in that loop. Not a second chatbot nested inside a function. Not a merge of two git histories into “a new product.” Three tools on the agent, the same index logic behind them, and a store that belongs to Fractal. Not to the demo corpus.

That is what “agentic” adds here: **the model decides when to retrieve.**

---

## Naive RAG vs the agent loop

![Spiral concrete staircase seen from below](/articles/agentic-rag/loop.webp)

micro-rag’s CLI is still the one-shot path. Embed the question, search, complete, check citations:

```text
question → embed → top-k chunks → generate → check_grounding
```

Fractal’s loop did not change. It already looks like this:

```text
for turn in 1..max_iterations:
    response = model(messages, tools)
    if no tool_calls:
        return final text
    for each tool_call:
        result = execute(tool_call)
        append role=tool
```

The only new fact is which names appear in `tool_calls`. After the wiring, a literary question can spend turns on `Index`, then `Retrieve`, then `Retrieve` again with a tighter query, then `CheckGrounding` on a draft, then a final `content` string. Same `run_agent_loop`. Same OpenRouter chat client. Retrieval is no longer a pipeline you invoke; it is a capability the model can spend a turn on.

Stuffing *k*=20 into naive RAG and calling it agentic is the failure mode I wanted to avoid. More context is not a loop. A loop is the chance to **observe** that the first shelf was wrong and walk to another one.

Verbose mode is the figure that matters. Fractal already logs `→ Retrieve` on stderr with `-v`. Those traces are how you show agency. A nicer final paragraph is not.

---

## Three tools, one library

![Open hardcover books stacked on a table](/articles/agentic-rag/retrieve.webp)

micro-rag became an installable package (`name = "micro-rag"`, import `micro_rag`). The facade is path-agnostic: every mutating or read call takes `embeddings_path` and `chunks_path`. The CLI still defaults to this repo’s `data/` files. Fractal never reads or writes them.

```python
from micro_rag.api import index_documents, retrieve, check_grounding
```

Fractal wraps that API as three tools, one module each, registered in `ALL_TOOLS` the same way Grep is:

| Tool | Job | What it returns |
|------|-----|-----------------|
| `Index` | Chunk and embed `.txt`/`.md` under a path | File count, chunk count, store paths |
| `Retrieve` | Embed a query, cosine search, record hits | Excerpts with `[source, locator]` and scores |
| `CheckGrounding` | Parse citations against retrieved chunks | `ok`, or unmatched citation strings |

**Retrieve stays dumb.** It does not call a chat model. It returns the same excerpt layout the naive CLI already used:

```text
Excerpt 1 - [Pride and Prejudice, Chapter XIX] (score=0.6585)
...
```

If the tool generated the answer internally, the agent would not be doing RAG. A black box would. Grounding would also become theatre: you could not tell whether a citation came from a chunk the *agent* had seen.

`CheckGrounding` is the existing regex check, not a second LLM. It validates `[Book Title, Chapter]` (or `[source, locator]` for generic files) against an allowlist of chunks **this process actually retrieved** for Fractal’s store. Retrieve first, or it errors. Union of retrieves in the session is the allowlist, so a second, tighter query can add chapters instead of wiping the first.

`Index` is how the agent gets a corpus at all. Known Gutenberg filenames keep the chapter/part/book splitters from the previous article. Other `.txt`/`.md` files pack paragraphs, then sentences, then tokens. `replace=false` appends; `replace=true` rebuilds. A missing index plus append creates the store. Pointing `Index` at micro-rag’s `data/books` uses those files as **sources**. The matrix still lands under Fractal’s directory.

Chat stays on OpenRouter. Query and document embeddings stay `text-embedding-3-small` on OpenAI, so they match the matrix. Two keys, two jobs. Mixing them would silently search the wrong space.

---

## Wiring it without merging products

I almost started a third repo. That would have reimplemented the loop and the index to get a new README. The missing piece was a tool, not a company.

Fractal lists a normal dependency and pins the source to the GitHub repo:

```toml
# fractal-engine/pyproject.toml
dependencies = ["openai>=2.15.0", "micro-rag"]

[tool.uv.sources]
micro-rag = { git = "https://github.com/noplisu/micro-rag.git" }
```

Storage is the other seam. micro-rag’s `data/` defaults fit a standalone demo. Reusing the logic must not reuse that folder. Fractal passes its own paths, defaulting to `{cwd}/.fractal/rag/embeddings.npy` and `chunks.jsonl`. `--cwd` is already the agent’s workspace, so the index is **this working tree’s memory**. `FRACTAL_RAG_DIR` overrides the directory. `.fractal/` is gitignored.

Until the agent indexes documents, Retrieve fails with a clear error rather than falling back to micro-rag’s corpus.

---

## Guardrails

A harness without limits is a liability. The RAG tools inherit that, and add a few of their own.

**Prompt policy.** The system prompt now says: for a document corpus, Index if needed, Retrieve before claiming facts, cite with the labels from the excerpts, CheckGrounding before the final answer. If excerpts are thin, retrieve again or refuse. Prefer Retrieve for meaning; use Grep or Read to verify a quote in the source file.

**No nested completion.** Index, Retrieve, and CheckGrounding never call `chat.completions`. The only model that writes prose is the one already inside `run_agent_loop`.

**Errors are data.** Missing `OPENAI_API_KEY`, missing index, missing retrieve-before-grounding, and import failures are strings the model can read. They do not crash the process. Same lesson as invalid JSON on Write.

**Truncate Retrieve.** Tool output still hits `MAX_TOOL_OUTPUT`. A generous *k* should not dump the whole corpus into the next turn.

**Citation grammar is still a first-class failure.** The previous article caught `[Crime and Punishment, Part III, Chapter V; Part III, Chapter V]` - the chapter was retrieved; the string was not. CheckGrounding still flags that instead of normalizing it away. The agent can retrieve again or fix the cite. A cleaned answer presented as grounded would hide the failure you care about measuring.

None of this is a sandbox for untrusted prompts. It is enough that a personal agent, on your machine, fails in a way you can see with `-v`.

---

## The Results: a loop instead of a cosine table

The interesting result is not a new chunk-size sweep. Those numbers still belong to [the naive pipeline](/blog/micro-rag). What changed is **who gets another turn**.

Three shapes from that article are the right tests for the loop.

**Clean win, still a win.** *Why does Elizabeth refuse Mr Collins?* Naive RAG already hits Chapter XIX and cites it. Agentic RAG should Index (if the store is empty), Retrieve, maybe CheckGrounding, and stop. Extra turns here are waste, not intelligence. The prompt’s turn budget still matters.

**Wrong first query.** A thematic prompt that under-ranks the answering chapter is where the loop earns its keep. The first `Retrieve` comes back thin; the model can rewrite the query proper names, a heading, a tighter paraphrase and retrieve again. Naive RAG cannot do that unless *you* resubmit. Verbose logs should show two `→ Retrieve` lines with different `query` arguments, not a larger *k*.

**Grounding fail → retry.** The semicolon mash-up is still possible. CheckGrounding returns unmatched citations. The agent can Retrieve the missing locator, Read the Gutenberg file around that chapter, or admit the corpus is insufficient. The check runs on the draft **before** the user-facing answer, which the one-shot CLI could only do after printing.

Hybrid search is the quiet win. Cosine finds “scenes about wounded pride.” Grep finds `Mr Collins`. Read confirms the quote is actually on the page. The previous pieces treated lexical and semantic search as separate products (Bookmantic’s next step; micro-rag’s brute-force matrix). In Fractal they are just two tools on the same message list.

I did not merge the repos. Fractal gained three tools. micro-rag gained a library facade. The naive CLI still answers one question with one retrieve. That contrast is the article: same chunks, different control flow.

```bash
./run.sh -v -p "Index ../micro-rag/data/books then: why does Elizabeth refuse Mr Collins? Cite sources and check grounding."
```

After a successful Index, `{cwd}/.fractal/rag/` should contain `embeddings.npy` and `chunks.jsonl`. micro-rag’s `data/` should be untouched.

---

## Lessons Learned

**Keep Retrieve dumb.** Returning excerpts is the whole point of agency. A tool that answers the question hides the loop you are trying to teach and makes grounding a story you tell about a call you cannot inspect.

**Logic is shared; storage is not.** A library that defaults to the demo corpus will eventually write the agent’s index on top of the article’s. Pass paths. Let each app own its files.

**The loop is still the product.** Adding RAG did not require a new agent framework. It required `ALL_TOOLS` to grow by three and the system prompt to say when to use them. That is the same lesson as [harnessing the coding agent](/blog/harnessing-ai): get `run_agent_loop` solid before inventing a fourth abstraction.

**Schema is UX for the model.** “Does not generate an answer” on Retrieve, “Retrieve first” on CheckGrounding, and “no index; use Index” as an error string stop the model from calling the pipeline in the wrong order. Vague tools produce vague traces.

**Hybrid beats a larger *k*.** Semantic search and regex search fail in different ways. An agent that can do both does not need you to pick a winner in advance.

**Do not start a new product to compose two small ones.** A third README that copies the loop and the index would have been slower and less honest. Composition is the story.

---

## Conclusion

Retrieval from Bookmantic, grounded generation from micro-rag, and Fractal’s tool loop are now one workflow you can read in an afternoon. The naive path is still there: embed, search, complete, check. The agentic path is the same index, called when the model chooses, with Grep and Read as the verification step.

Clone [Fractal Engine](https://github.com/noplisu/fractal-engine) next to [micro-rag](https://github.com/noplisu/micro-rag), `uv sync`, export OpenRouter for chat and OpenAI for embeddings, and run a question you know the books can answer. Watch `-v` for `→ Index` / `→ Retrieve` / `→ CheckGrounding`. Then ask one the first retrieve will miss, and see whether the model spends a turn on a better query instead of bluffing.

That is the shortest path from “agentic RAG” as a slogan to a harness you can measure the same standard this series has used since keyword search stopped being enough.
