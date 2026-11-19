import { Component, computed, input, output } from "@angular/core";

import { STATUS_LABELS } from "../../core/books";
import type { Book } from "../../core/types";

@Component({
  selector: "app-book-card",
  styleUrl: "./book-card.css",
  templateUrl: "./book-card.html",
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly done = output<string>();

  protected readonly statusLabel = computed(
    () => STATUS_LABELS[this.book().status]
  );
  protected readonly stars = computed(() => {
    const rating = this.book().rating;
    return rating === null ? "" : "★".repeat(rating) + "☆".repeat(5 - rating);
  });
}
