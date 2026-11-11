import { useEffect, useState, type FormEvent } from "react";

import { ApiError, createBook, getBook, updateBook } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { STATUS_LABELS } from "@/labels";
import type { Book, Status } from "@/types";

type FormState = {
  title: string;
  author: string;
  status: Status;
  rating: string; // "none" or "1" to "5"
  notes: string;
};

const EMPTY: FormState = {
  title: "",
  author: "",
  status: "want-to-read",
  rating: "none",
  notes: "",
};

const STATUS_ITEMS = (Object.keys(STATUS_LABELS) as Status[]).map((value) => ({
  value,
  label: STATUS_LABELS[value],
}));
const RATING_ITEMS = [
  { value: "none", label: "Not rated" },
  ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n} of 5` })),
];

type Props = {
  open: boolean;
  /** `null` adds a new book, an id edits that book. */
  bookId: string | null;
  onClose: () => void;
  onSaved: (book: Book, mode: "added" | "updated") => void;
  onLoadFailed: (message: string) => void;
};

export function BookForm({
  open,
  bookId,
  onClose,
  onSaved,
  onLoadFailed,
}: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Reset when the dialog opens. For an edit, load the current book from the API.
  useEffect(() => {
    if (!open) return;
    setForm(EMPTY);
    setTouched(false);
    setServerError(null);
    if (bookId === null) return;

    let cancelled = false;
    setLoading(true);
    getBook(bookId)
      .then((book) => {
        if (cancelled) return;
        setForm({
          title: book.title,
          author: book.author,
          status: book.status,
          rating: book.rating === null ? "none" : String(book.rating),
          notes: book.notes,
        });
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoading(false);
        onLoadFailed(
          err instanceof Error ? err.message : "Could not load the book"
        );
      });
    return () => {
      cancelled = true;
    };
    // onLoadFailed only shows a toast and closes the dialog, so it is not a dependency.
  }, [open, bookId]);

  const titleMissing = form.title.trim() === "";
  const authorMissing = form.author.trim() === "";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    setServerError(null);
    if (titleMissing || authorMissing) return;

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
      rating: form.rating === "none" ? null : Number(form.rating),
      notes: form.notes,
    };
    setSaving(true);
    try {
      const book =
        bookId === null
          ? await createBook(payload)
          : await updateBook(bookId, payload);
      onSaved(book, bookId === null ? "added" : "updated");
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        // The book was deleted elsewhere: close the dialog and refresh the list.
        onLoadFailed(err.message);
        return;
      }
      setServerError(
        err instanceof Error ? err.message : "Could not save the book"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {bookId === null ? "Add a book" : "Edit book"}
          </DialogTitle>
          <DialogDescription>Title and author are required.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="book-title">Title</Label>
            <Input
              id="book-title"
              value={form.title}
              disabled={loading}
              aria-invalid={touched && titleMissing}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {touched && titleMissing && (
              <p className="text-sm text-destructive">Title is required</p>
            )}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="book-author">Author</Label>
            <Input
              id="book-author"
              value={form.author}
              disabled={loading}
              aria-invalid={touched && authorMissing}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            {touched && authorMissing && (
              <p className="text-sm text-destructive">Author is required</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label id="book-status-label">Status</Label>
              <Select
                items={STATUS_ITEMS}
                value={form.status}
                onValueChange={(value) =>
                  value && setForm({ ...form, status: value as Status })
                }
              >
                <SelectTrigger
                  aria-labelledby="book-status-label"
                  className="w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_ITEMS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label id="book-rating-label">Rating</Label>
              <Select
                items={RATING_ITEMS}
                value={form.rating}
                onValueChange={(value) =>
                  value && setForm({ ...form, rating: value })
                }
              >
                <SelectTrigger
                  aria-labelledby="book-rating-label"
                  className="w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RATING_ITEMS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="book-notes">Notes</Label>
            <Textarea
              id="book-notes"
              value={form.notes}
              disabled={loading}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          {serverError && (
            <p role="alert" className="text-sm text-destructive">
              {serverError}
            </p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
