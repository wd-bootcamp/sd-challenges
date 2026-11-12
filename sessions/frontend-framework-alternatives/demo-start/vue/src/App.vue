<script setup lang="ts">
import { computed, ref } from "vue";

import BookCard from "@/components/BookCard.vue";
import { filterBooks, STATUSES, STATUS_LABELS, updateBook } from "@/core/books";
import { loadBooks } from "@/core/storage";
import type { StatusFilter } from "@/core/types";

const books = ref(loadBooks());
const query = ref("");
const status = ref<StatusFilter>("all");

const visibleBooks = computed(() =>
  filterBooks(books.value, { status: status.value, query: query.value })
);

function markDone(id: string) {
  books.value = updateBook(books.value, id, { status: "done" });
}
</script>

<template>
  <main>
    <h1>Reading List</h1>
    <input
      v-model="query"
      type="search"
      placeholder="Search by title"
      aria-label="Search by title"
    />
    <select v-model="status" aria-label="Filter by status">
      <option value="all">All</option>
      <option v-for="s in STATUSES" :key="s" :value="s">
        {{ STATUS_LABELS[s] }}
      </option>
    </select>
    <p>{{ visibleBooks.length }} of {{ books.length }} books</p>
    <div class="grid">
      <BookCard
        v-for="book in visibleBooks"
        :key="book.id"
        :book="book"
        @done="markDone"
      />
    </div>
  </main>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}
</style>
