<script lang="ts">
  import { STATUS_LABELS } from "../core/books";
  import type { Book } from "../core/types";

  type Props = { book: Book; ondone: (id: string) => void };
  let { book, ondone }: Props = $props();

  const stars = $derived(
    book.rating === null
      ? ""
      : "★".repeat(book.rating) + "☆".repeat(5 - book.rating),
  );
</script>

<article class="card">
  <h3>{book.title}</h3>
  <p>{book.author}</p>
  <span class="badge badge-{book.status}">{STATUS_LABELS[book.status]}</span>
  {#if book.rating !== null}
    <p>
      <span role="img" aria-label="Rating: {book.rating} of 5">{stars}</span>
    </p>
  {:else}
    <p>Not rated</p>
  {/if}
  {#if book.status !== "done"}
    <button type="button" onclick={() => ondone(book.id)}>Mark as done</button>
  {/if}
</article>

<style>
  .card {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 1rem;
  }
  .badge {
    border-radius: 999px;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    background: #e2e8f0;
  }
  .badge-reading {
    background: #fef3c7;
  }
  .badge-done {
    background: #dcfce7;
  }
</style>
