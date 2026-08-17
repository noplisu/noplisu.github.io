---
title: "Beyond Keywords: Implementing Semantic Search in Bookmantic"
description: "How I built Bookmantic, a Rails 8 book discovery API that finds titles by intent using OpenAI embeddings, PostgreSQL pgvector, and a curated ~45k catalog from Open Library."
excerpt: "Keyword search fails when readers describe a mood instead of a title. Here is how Bookmantic turns natural-language queries into vector neighbors—and what it took to make the catalog worth searching."
author: "Grzegorz Lisowski"
publishedAt: "2026-08-17T00:00:00.000Z"
updatedAt: "2026-08-17T00:00:00.000Z"
tags: ["Rails", "AI", "pgvector", "Semantic Search"]
category: "case-study"
featured: true
readingTime: 9
slug: "implementing-semantic-search-in-bookmantic"
image: "/articles/semantic-search/card.webp"
---

## Introduction: Finding meaning

![Bookmantic homepage](/articles/semantic-search/home.webp)

Most applications still search the way a filing cabinet does. You type a word, the database looks for that word, and you get back rows that contain it. In Rails that usually means `ILIKE`, a `tsvector` column, Elasticsearch, or a hosted search product. Those tools are excellent when the user already knows the title, the author, or a distinctive phrase.

They fall apart the moment the query is a description of *intent*.

A reader who types **“hopeful sci-fi”** does not want books whose blurbs literally contain those two tokens. They want stories that feel like hope in a future setting - books that might talk about “found family among the stars,” “a colony that learns to trust again,” or “optimism after collapse.” Full-text search cannot make that leap. It has no notion of synonymy, mood, or paraphrase. If the keywords are missing, the book is missing.

That gap is why I built [Bookmantic](https://bookmantic.com): a small discovery app where you describe what you want to read, and the catalog answers by meaning rather than by string match. Under the hood it is a Rails 8 API, PostgreSQL with [pgvector](https://github.com/pgvector/pgvector), Andrew Kane’s [neighbor](https://github.com/ankane/neighbor) gem, and OpenAI `text-embedding-3-small` embeddings. The source lives in [github.com/noplisu/bookmantic](https://github.com/noplisu/bookmantic).

This case study walks through that stack: why semantic search, how it lands in Rails without blocking web requests, how the book catalog was built, what the results actually look like, and why this retrieval layer is a natural base for RAG later.

---

## Implementing semantic search in Rails

![Indexing, search, and similar-book flows](/articles/semantic-search/architecture.svg)

The first working slice was a proof of concept: embed some text, store a vector, query by cosine distance. That [vector search POC](https://github.com/noplisu/bookmantic/commit/4fcc0403c30c6f520e686f20cb3f636f88beabec) indexed sample articles. The production shape is the same idea applied to books.

The moving parts are deliberately few:

1. A `Book` row holds `title`, `url`, `description`, optional `genres` and `category`, and a nullable `embedding vector(1536)`.
2. A Sidekiq job is the **only** writer of embeddings. Creating a book enqueues work; the HTTP request never calls OpenAI.
3. Search embeds the query once, then asks Postgres for nearest neighbors.
4. “Similar books” reuses the stored vector, so that endpoint does not hit OpenAI at all.

### The model and the index

Neighbor adds a `has_neighbors` declaration. The interesting part is the column type and the index. ActiveRecord still does not dump `vector` cleanly into `schema.rb`, so the app uses `config.active_record.schema_format = :sql` and `db/structure.sql`.

```ruby
class Book < ApplicationRecord
  has_neighbors :embedding

  validates :title, presence: true
  validates :url, presence: true
  validates :description, presence: true

  after_create_commit :enqueue_embedding_generation,
    unless: -> { ActiveModel::Type::Boolean.new.cast(ENV["DISABLE_EMBEDDING_CALLBACKS"]) }

  private

  def enqueue_embedding_generation
    GenerateEmbeddingJob.perform_later(id)
  end
end
```

The HNSW index uses cosine ops, matching the metric used at query time. At ~45k rows, exact nearest-neighbor in Postgres would still be acceptable. HNSW is the default I would keep as the catalog grows: more memory and a slower build than a sequential scan, no IVFFlat training step, and no index swap at the next order of magnitude.

```sql
ALTER TABLE books ADD COLUMN embedding vector(1536);

CREATE INDEX index_books_on_embedding_hnsw
  ON books
  USING hnsw (embedding vector_cosine_ops);
```

### Choosing an embedding model

`text-embedding-3-small` at 1536 dimensions is the boring, correct choice for an MVP. It is cheap, fast, and good enough that catalog quality dominates model quality. A larger model would not rescue a dump full of dictionaries, large-type reprints, and empty descriptions.

The service is a thin wrapper around `ruby-openai`. It truncates oversized Open Library blurbs so a single outlier description cannot fail the job:

```ruby
class EmbeddingService
  MODEL = "text-embedding-3-small"
  DIMENSIONS = 1536
  MAX_EMBED_CHARS = 50_000

  def self.embed!(text)
    input = text.to_s.strip
    raise Error, "Text to embed is empty." if input.blank?
    input = input[0, MAX_EMBED_CHARS] if input.length > MAX_EMBED_CHARS

    response = client.embeddings(
      parameters: { model: MODEL, input: input, dimensions: DIMENSIONS }
    )

    vector = response.dig("data", 0, "embedding")
    raise Error, "No embedding vector in OpenAI response." if vector.blank? || vector.size != DIMENSIONS
    vector
  end
end
```

The job concatenates title, description, category, and genres. That mix matters: a short synopsis plus subject tags gives the vector both plot and shelf.

```ruby
def perform(book_id)
  book = Book.find(book_id)
  parts = [book.title, book.description]
  parts << "Category: #{book.category}" if book.category.present?
  parts << book.genres if book.genres.present?
  vector = EmbeddingService.embed!(parts.join("\n\n"))
  book.update_column(:embedding, vector)
end
```

`update_column` skips callbacks so storing the vector cannot re-enqueue the job. Seed and bulk import set `DISABLE_EMBEDDING_CALLBACKS` and enqueue (or skip) jobs explicitly.

### Search and similar

Search is one embedding plus one neighbor query. Books without a vector are excluded so a half-finished Sidekiq queue cannot pollute results:

```ruby
query_vector = EmbeddingService.embed!(q)
books = Book
  .where.not(embedding: nil)
  .nearest_neighbors(:embedding, query_vector, distance: "cosine")
  .limit(5)
```

Similar books skip OpenAI and compare against the stored vector. If that column is still null, the API returns 422 instead of guessing:

```ruby
books = Book
  .where.not(id: book.id)
  .where.not(embedding: nil)
  .nearest_neighbors(:embedding, book.embedding, distance: "cosine")
  .limit(5)
```

That split is the whole product loop: describe a mood to enter the catalog, then walk sideways through neighbors. The Rails side of Bookmantic is small on purpose. Most of the work is elsewhere—in the data.

---

## Preparing the data

![Catalog pipeline from Open Library dumps to a prepared Postgres dump](/articles/semantic-search/pipeline.svg)

Vector search is only as interesting as the documents you embed. Open Library’s monthly dumps are enormous and uneven: millions of editions, duplicate works, juvenile reprints, dictionaries, and records with no usable description. Indexing “everything” would have been expensive and, worse, noisy.

The pipeline lives under [`data/`](https://github.com/noplisu/bookmantic/tree/main/data) and [`scripts/`](https://github.com/noplisu/bookmantic/tree/main/scripts):

1. Download the editions and works dumps into `data/raw/`.
2. Resolve a committed **curated manifest** of classics and learning anchors into full rows with descriptions.
3. Export a blended ~45k CSV with genre quotas.
4. Validate before seed or embed.

The blended export is the important design choice. Curated titles always get in. Then edition-ranked Open Library works fill quotas: roughly 10k learning, 15k fiction, 12k nonfiction, and 5k popular fill. Global filters drop juvenile, dictionaries, large-type, encyclopedias, and other reference-shaped records. A minimum description length (120 characters) keeps empty stubs out of embedding space.

Ranking by edition count is a cheap popularity proxy. It is not a quality score, but it prefers books people actually publish and reprint over one-off catalog noise. Quotas stop the catalog from collapsing into whatever the dump happens to contain most of.

After validation, Rails seeds from `data/processed/books_top45k.csv`. Development loads 200 rows by default; `BOOK_SEED_FULL=1` loads the lot and enqueues embedding jobs. For staging and production, embeddings are generated once locally, then shipped as a Postgres dump (`bin/db-dump` / `bin/db-restore`). That avoids paying OpenAI again on every deploy and keeps HNSW indexes intact.

The lesson from this stage is blunt: **the ETL is the product**. A clever neighbor query over junk is still junk.

---

## The Results: finding books by meaning

Once the catalog is embedded, queries start to behave like conversation instead of grep. Here is what that looks like with real rows, not a vibe.

![Search results for hopeful science fiction about friendship and discovery](/articles/semantic-search/results.webp)

A chip on the homepage turns **“hopeful sci-fi”** into *hopeful science fiction about friendship and discovery*. Keyword search would hunt for those tokens. Neighbor search returned:

1. **The Companions** — planets named Jungle, Stone, and Moss; companionship is the plot, not a synonym stuffed into the blurb.
2. **The incredible tide** — a boy on a rocky island after a holocaust; survival with an undercurrent of rebuilding.
3. **To Be Taught, If Fortunate** — somaforming and exoplanets; the optimism lives in the science, not the title.

None of those titles contain “hopeful” or “sci-fi.” Cosine distance sat around 0.45–0.48. That is close enough to be the same shelf, far enough that a five-word prompt is still a thin document compared with a stored blurb.

The **Startup biography** chip expands to *biography of a technology founder building a company* and lands on *Founders at Work*, *Becoming Steve Jobs*, and *Anything You Want*—none of which need the word startup in the blurb. Type only **“startup biography”** and you still get founder stories, plus *LinkedIn Profile Optimization for Dummies*: career-adjacent, not a life. A longer prompt is a better document. Semantic recall gives you the shelf; prompt length decides how much junk sits next to it.

Similar-book pages are the second test. Clicking through from a hit should feel like a shelf, not a random sample. Because that path uses the stored vector, it is also cheap: no extra embedding call, just HNSW over ~45k rows.

![Similar books expanded under The Companions](/articles/semantic-search/similar.webp)

From *The Companions* the neighbors are other planetary-adventure novels: *Omnivore*, *Snare*, *The howling stones*, *Ally*, *The skinner*. Distances there are tighter (about 0.32–0.35) than query-to-book. A stored book vector is a richer document than a short prompt, so sideways walks are usually cleaner than the first search.

Distance is exposed in the JSON as `cosine_distance` and `cosine_similarity`. Lower distance is closer. I do not show raw scores in the UI as a ranking explanation—readers do not think in cosine—but they are useful when tuning what “close enough” means.

The instructive miss is an identifier. Searching the ISBN `9780141439518` (a Penguin *Pride and Prejudice*) returns unrelated nonfiction at distance ~0.60: noise, not a near miss. The one-letter query “a” is the same shape. Type the title *pride and prejudice* and the book comes back, because that string lives in the description. Semantic search is strong at *vibe* and weak at *exact lookup*. That is the next design constraint, not a reason to throw vectors away.

You can try it live at [bookmantic.com](https://bookmantic.com).

---

## Lessons Learned

**Data quality beats model upgrades.** Cleaning Open Library, enforcing description length, and blending curated classics did more for relevance than swapping embedding models would have. Garbage in embedding space is still garbage, only harder to debug.

**Keep generation off the request path.** Embedding 45k books is a queue, a rate limit, and a bill. Search only needs one query vector. Similar books need zero. Sidekiq plus `update_column` keeps the API snappy and the OpenAI client in one place.

**Cost is mostly the backfill.** At OpenAI list prices, embedding ~45k short documents with `text-embedding-3-small` is a few dollars, not a few hundred. The expensive parts are wall-clock time (one Sidekiq job per book, plus rate limits) and a ~300MB Postgres dump so production never repeats that work. In production, search is about 0.3–1.5s, almost all of it the query embedding. Similar books skip OpenAI and return in under 100ms. Re-embedding the catalog because you changed the input recipe is the bill you actually want to avoid.

**Vector search is not a full search product.** Exact titles, author names, and identifiers still belong to lexical search. The useful end state is hybrid: keyword for precision, vectors for recall and mood, then a simple merge. Bookmantic is honest about being the semantic half first. Connecting the two is the obvious next improvement, not an afterthought I pretend is already done.

**Stay inside Postgres until you must leave.** pgvector plus HNSW is enough at this scale. Exact kNN would still answer in time at 45k; the index is a habit for the next size up, not a requirement to make the demo work. A dedicated vector database would have added ops without changing the user-visible result.

---

## Conclusion

Bookmantic started as a question: can a Rails app let someone find a book by describing a feeling? The answer is yes, if you treat embeddings as a column, neighbor search as a query, and catalog construction as the hard part.

The same retrieval path is a base for RAG later: five real neighbors in, a recommendation out, instead of a model inventing titles. Retrieval without generation already works.

If you are adding semantic search to an existing Rails app, start smaller than a 45k dump: one model, one HNSW index, jobs instead of callbacks, and a dataset you have actually read. The vectors will do their job. Your job is to give them something worth finding.

The code is on [GitHub](https://github.com/noplisu/bookmantic). The running catalog is at [bookmantic.com](https://bookmantic.com).
