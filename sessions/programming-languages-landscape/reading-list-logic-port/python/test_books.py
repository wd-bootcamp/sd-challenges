import json
import unittest
from pathlib import Path

from books import STATUS_LABELS, Book, filter_books

FIXTURES_PATH = Path(__file__).parent.parent / "fixtures" / "cases.json"
FIXTURES = json.loads(FIXTURES_PATH.read_text(encoding="utf-8"))
BOOKS = [Book(**data) for data in FIXTURES["books"]]


class FilterBooksTest(unittest.TestCase):
    def test_fixture_cases(self):
        for case in FIXTURES["filterCases"]:
            with self.subTest(case["name"]):
                result = filter_books(BOOKS, case["status"], case["query"])
                self.assertEqual([book.id for book in result], case["expectedIds"])

    def test_does_not_change_the_list_it_receives(self):
        ids_before = [book.id for book in BOOKS]
        filter_books(BOOKS, "done", "the")
        self.assertEqual([book.id for book in BOOKS], ids_before)


class StatusLabelsTest(unittest.TestCase):
    def test_labels(self):
        self.assertEqual(STATUS_LABELS, FIXTURES["statusLabels"])


if __name__ == "__main__":
    unittest.main()
