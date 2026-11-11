import { PencilIcon, StarIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STATUS_LABELS } from "@/labels";
import type { Book, Status } from "@/types";

const STATUS_STYLES: Record<Status, string> = {
  "want-to-read": "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200",
  reading: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  done: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
};

type Props = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export function BookCard({ book, onEdit, onDelete }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-3">
          <Badge className={STATUS_STYLES[book.status]}>
            {STATUS_LABELS[book.status]}
          </Badge>
          {book.rating !== null ? (
            <span
              role="img"
              className="flex items-center gap-0.5"
              aria-label={`Rating: ${book.rating} of 5`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon
                  key={index}
                  aria-hidden="true"
                  className={`size-4 ${index < book.rating! ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
                />
              ))}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Not rated</span>
          )}
        </div>
        {book.notes && <p className="text-sm">{book.notes}</p>}
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          aria-label={`Edit ${book.title}`}
          onClick={() => onEdit(book)}
        >
          <PencilIcon /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label={`Delete ${book.title}`}
          onClick={() => onDelete(book)}
        >
          <Trash2Icon /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
