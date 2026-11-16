import { useCallback, useEffect, useState } from "react";

import * as api from "./api";
import type { Book, NewBook, Status } from "./types";

export function useBooksApi(status: Status | undefined) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setBooks(await api.listBooks({ status }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void reload();
  }, [reload]);

  // After every change we load the list again: the server is the source of truth.
  async function run(action: () => Promise<unknown>) {
    try {
      await action();
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return {
    books,
    loading,
    error,
    addBook: (book: Pick<NewBook, "title" | "author">) =>
      run(() => api.createBook(book)),
    markDone: ({ id, ...rest }: Book) =>
      run(() => api.replaceBook(id, { ...rest, status: "done" })),
    deleteBook: (id: string) => run(() => api.deleteBook(id)),
  };
}
