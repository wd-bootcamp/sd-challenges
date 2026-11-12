import { useCallback, useEffect, useState } from "react";

import { listBooks } from "./api";
import type { Book, StatusFilter } from "./types";

/** Loads the books from the API, again whenever the filters change. */
export function useBooks(filter: { status: StatusFilter; q: string }) {
  const { status, q } = filter;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    listBooks({ status, q }, controller.signal)
      .then((result) => {
        setBooks(result);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      });
    return () => controller.abort();
  }, [status, q, reloadCount]);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  return { books, loading, error, reload };
}
