from dataclasses import dataclass
from typing import Optional


@dataclass
class Book:
    id: str
    title: str
    author: str
    status: str  # "want-to-read", "reading" or "done"
    rating: Optional[int]  # 1 to 5, None means "not rated"
    notes: str


# TODO: the labels of the three statuses (see fixtures/cases.json)
STATUS_LABELS: dict = {}


def filter_books(books: list, status: str, query: str) -> list:
    """Return the books that match `status` ("all" or one status) and the title query."""
    # TODO: implement, run the tests, repeat
    raise NotImplementedError("filter_books is not implemented yet")
