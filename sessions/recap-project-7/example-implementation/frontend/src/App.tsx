import { PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ApiStatus } from "@/components/ApiStatus";
import { BookCard } from "@/components/BookCard";
import { BookForm } from "@/components/BookForm";
import { DeleteBookDialog } from "@/components/DeleteBookDialog";
import { Stats } from "@/components/Stats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STATUS_LABELS } from "@/labels";
import type { Book, Status, StatusFilter } from "@/types";
import { useBooks } from "@/useBooks";
import { useDebouncedValue } from "@/useDebouncedValue";

type FormTarget =
  { mode: "closed" } | { mode: "add" } | { mode: "edit"; id: string };

export default function App() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const q = useDebouncedValue(search);
  const { books, loading, error, reload } = useBooks({ status, q });

  const [formTarget, setFormTarget] = useState<FormTarget>({ mode: "closed" });
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const filtered = status !== "all" || q.trim() !== "";

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Reading List</h1>
          <ApiStatus />
        </div>
        <Button onClick={() => setFormTarget({ mode: "add" })}>
          <PlusIcon /> Add book
        </Button>
      </header>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Search by title"
            placeholder="Search by title..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs
          value={status}
          onValueChange={(value) => setStatus(value as StatusFilter)}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {(Object.keys(STATUS_LABELS) as Status[]).map((value) => (
              <TabsTrigger key={value} value={value}>
                {STATUS_LABELS[value]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <main className="mt-6" aria-busy={loading}>
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Could not load your books</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={reload}
              >
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        ) : loading && books.length === 0 ? (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading books"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="font-medium">
              {filtered
                ? "No books match your search."
                : "Your reading list is empty."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered
                ? "Try another title or status."
                : "Add your first book to get started."}
            </p>
          </div>
        ) : (
          <>
            <Stats books={books} />
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <li key={book.id} className="flex">
                  <BookCard
                    book={book}
                    onEdit={(b) => setFormTarget({ mode: "edit", id: b.id })}
                    onDelete={setBookToDelete}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <BookForm
        open={formTarget.mode !== "closed"}
        bookId={formTarget.mode === "edit" ? formTarget.id : null}
        onClose={() => setFormTarget({ mode: "closed" })}
        onSaved={(book, mode) => {
          setFormTarget({ mode: "closed" });
          toast.success(
            mode === "added"
              ? `Book added: ${book.title}`
              : `Book saved: ${book.title}`
          );
          reload();
        }}
        onLoadFailed={(message) => {
          setFormTarget({ mode: "closed" });
          toast.error(message);
          reload();
        }}
      />
      <DeleteBookDialog
        book={bookToDelete}
        onClose={() => setBookToDelete(null)}
        onDeleted={(book) => {
          setBookToDelete(null);
          toast.success(`Book deleted: ${book.title}`);
          reload();
        }}
        onFailed={(message) => {
          setBookToDelete(null);
          toast.error(message);
          reload();
        }}
      />
      <Toaster />
    </div>
  );
}
