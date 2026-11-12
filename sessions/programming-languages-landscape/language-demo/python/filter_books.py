from dataclasses import dataclass


@dataclass
class Book:
    title: str
    author: str
    status: str  # "want-to-read", "reading" or "done"


books = [
    Book("Dune", "Frank Herbert", "done"),
    Book("The Hobbit", "J. R. R. Tolkien", "done"),
    Book("Gone Girl", "Gillian Flynn", "want-to-read"),
    Book("Neuromancer", "William Gibson", "reading"),
    Book("The Name of the Wind", "Patrick Rothfuss", "want-to-read"),
    Book("Klara and the Sun", "Kazuo Ishiguro", "done"),
]


def filter_books(books: list[Book], status: str, query: str) -> list[Book]:
    normalized_query = query.strip().lower()
    return [
        book
        for book in books
        if (status == "all" or book.status == status)
        and normalized_query in book.title.lower()
    ]


for book in filter_books(books, "done", "the"):
    print(f"{book.title} ({book.status})")
