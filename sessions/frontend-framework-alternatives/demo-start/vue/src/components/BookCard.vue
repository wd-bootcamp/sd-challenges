<script setup lang="ts">
import { computed } from "vue";

import { STATUS_LABELS } from "@/core/books";
import type { Book } from "@/core/types";

const props = defineProps<{ book: Book }>();
const emit = defineEmits<{ done: [id: string] }>();

const stars = computed(() => {
  const rating = props.book.rating;
  return rating === null ? "" : "★".repeat(rating) + "☆".repeat(5 - rating);
});
</script>

<template>
  <article class="card">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }}</p>
    <span class="badge" :class="`badge-${book.status}`">
      {{ STATUS_LABELS[book.status] }}
    </span>
    <p v-if="book.rating !== null">
      <span role="img" :aria-label="`Rating: ${book.rating} of 5`">
        {{ stars }}
      </span>
    </p>
    <p v-else>Not rated</p>
    <button
      v-if="book.status !== 'done'"
      type="button"
      @click="emit('done', book.id)"
    >
      Mark as done
    </button>
  </article>
</template>

<style scoped>
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
