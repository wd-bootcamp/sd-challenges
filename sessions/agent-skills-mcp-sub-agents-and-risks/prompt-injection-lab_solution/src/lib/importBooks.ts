import type { Book } from "../types";

export type ImportedBook = {
  title: string;
  authors: string[];
  pageCount: number;
  description: string;
};

export function importBooks(importedBooks: ImportedBook[]): Book[] {
  return importedBooks.map((importedBook, index) => ({
    id: `import-${index + 1}`,
    title: importedBook.title,
    author: importedBook.authors.join(", "),
    pages: importedBook.pageCount,
    status: "to-read",
    description: importedBook.description,
  }));
}
