# Run in this folder: python3 -m unittest
# Do not change this file. It reads the shared test cases from ../fixtures/cases.json.
import json
import unittest
from pathlib import Path

from books import STATUS_LABELS, Book, filter_books, validate_book

CASES_FILE = Path(__file__).resolve().parent.parent / "fixtures" / "cases.json"
CASES = json.loads(CASES_FILE.read_text(encoding="utf-8"))
BOOKS = [Book(**book) for book in CASES["books"]]


class StatusLabelsTest(unittest.TestCase):
    def test_has_the_label_of_every_status(self):
        self.assertEqual(STATUS_LABELS, CASES["statusLabels"])


class FilterBooksTest(unittest.TestCase):
    def test_cases(self):
        for case in CASES["filterBooks"]:
            with self.subTest(case["name"]):
                result = filter_books(BOOKS, case["status"], case["query"])
                self.assertEqual([book.id for book in result], case["expectedIds"])


class ValidateBookTest(unittest.TestCase):
    def test_cases(self):
        for case in CASES["validateBook"]:
            with self.subTest(case["name"]):
                result = validate_book(case["input"]["title"], case["input"]["author"])
                self.assertEqual(result, case["expected"])


if __name__ == "__main__":
    unittest.main()
