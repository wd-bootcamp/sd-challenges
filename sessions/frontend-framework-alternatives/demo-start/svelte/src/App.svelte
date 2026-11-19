<script lang="ts">
  import BookCard from "./lib/BookCard.svelte";
  import {
    filterBooks,
    STATUSES,
    STATUS_LABELS,
    updateBook,
  } from "./core/books";
  import { loadBooks } from "./core/storage";
  import type { StatusFilter } from "./core/types";

  let books = $state(loadBooks());
  let query = $state("");
  let status = $state<StatusFilter>("all");

  const visibleBooks = $derived(filterBooks(books, { status, query }));

  function markDone(id: string) {
    books = updateBook(books, id, { status: "done" });
  }
</script>

<main>
  <h1>Reading List</h1>
  <input
    type="search"
    bind:value={query}
    placeholder="Search by title"
    aria-label="Search by title"
  />
  <select bind:value={status} aria-label="Filter by status">
    <option value="all">All</option>
    {#each STATUSES as s (s)}
      <option value={s}>{STATUS_LABELS[s]}</option>
    {/each}
  </select>
  <p>{visibleBooks.length} of {books.length} books</p>
  <div class="grid">
    {#each visibleBooks as book (book.id)}
      <BookCard {book} ondone={markDone} />
    {/each}
  </div>
</main>

<style>
  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  }
</style>
