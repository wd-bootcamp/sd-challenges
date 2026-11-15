"""The Reading List logic, ported from TypeScript (see ../typescript/books.ts and ../SPEC.md)."""

from dataclasses import dataclass
from typing import Dict, List, Optional


@dataclass
class Book:
    id: str
    title: str
    author: str
    status: str  # "want-to-read", "reading" or "done"
    rating: Optional[int]  # 1 to 5, None means "not rated"
    notes: str


# TODO: the label of every status, see SPEC.md
STATUS_LABELS: Dict[str, str] = {}


def filter_books(books: List[Book], status: str, query: str) -> List[Book]:
    """status is "want-to-read", "reading", "done" or "all"."""
    # TODO: implement, see SPEC.md
    raise NotImplementedError("filter_books")


def validate_book(title: str, author: str) -> Dict[str, str]:
    """Returns an error message per invalid field. An empty dict means valid."""
    # TODO: implement, see SPEC.md
    raise NotImplementedError("validate_book")
