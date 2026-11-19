import { Component, computed, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { BookCard } from "./book-card/book-card";
import {
  filterBooks,
  STATUSES,
  STATUS_LABELS,
  updateBook,
} from "../core/books";
import { loadBooks } from "../core/storage";
import type { StatusFilter } from "../core/types";

@Component({
  imports: [BookCard, FormField],
  selector: "app-root",
  styleUrl: "./app.css",
  templateUrl: "./app.html",
})
export class App {
  protected readonly books = signal(loadBooks());
  protected readonly filter = signal<{ query: string; status: StatusFilter }>({
    query: "",
    status: "all",
  });
  protected readonly filterForm = form(this.filter);
  protected readonly statuses = STATUSES;
  protected readonly labels = STATUS_LABELS;

  protected readonly visibleBooks = computed(() =>
    filterBooks(this.books(), this.filter())
  );

  protected markDone(id: string) {
    this.books.update((books) => updateBook(books, id, { status: "done" }));
  }
}
