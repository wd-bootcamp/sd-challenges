package main

import (
	"fmt"
	"strings"
)

type Book struct {
	Title  string
	Author string
	Status string // "want-to-read", "reading" or "done"
}

func filterBooks(books []Book, status string, query string) []Book {
	normalizedQuery := strings.ToLower(strings.TrimSpace(query))
	result := []Book{}
	for _, book := range books {
		if (status == "all" || book.Status == status) &&
			strings.Contains(strings.ToLower(book.Title), normalizedQuery) {
			result = append(result, book)
		}
	}
	return result
}

func main() {
	books := []Book{
		{"Dune", "Frank Herbert", "done"},
		{"The Hobbit", "J. R. R. Tolkien", "done"},
		{"Gone Girl", "Gillian Flynn", "want-to-read"},
		{"Neuromancer", "William Gibson", "reading"},
		{"The Name of the Wind", "Patrick Rothfuss", "want-to-read"},
		{"Klara and the Sun", "Kazuo Ishiguro", "done"},
	}

	for _, book := range filterBooks(books, "done", "the") {
		fmt.Printf("%s (%s)\n", book.Title, book.Status)
	}
}
