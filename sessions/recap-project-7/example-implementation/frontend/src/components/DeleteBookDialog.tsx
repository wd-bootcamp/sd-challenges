import { useState } from "react";

import { deleteBook } from "@/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types";

type Props = {
  book: Book | null;
  onClose: () => void;
  onDeleted: (book: Book) => void;
  onFailed: (message: string) => void;
};

export function DeleteBookDialog({
  book,
  onClose,
  onDeleted,
  onFailed,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!book) return;
    setDeleting(true);
    try {
      await deleteBook(book.id);
      onDeleted(book);
    } catch (err) {
      onFailed(
        err instanceof Error ? err.message : "Could not delete the book"
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AlertDialog
      open={book !== null}
      onOpenChange={(next) => !next && onClose()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            "{book?.title}" will be removed from your reading list. This cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
