// Package readinglist is the Reading List logic, ported from TypeScript
// (see ../typescript/books.ts and ../SPEC.md).
package readinglist

// Book is one book of the reading list.
type Book struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Status string `json:"status"` // "want-to-read", "reading" or "done"
	Rating *int   `json:"rating"` // 1 to 5, nil means "not rated"
	Notes  string `json:"notes"`
}

// StatusLabels maps every status to its label.
// TODO: fill in the label of every status, see SPEC.md
var StatusLabels = map[string]string{}

// FilterBooks returns the books with the given status that match the query.
// status is "want-to-read", "reading", "done" or "all".
func FilterBooks(books []Book, status string, query string) []Book {
	// TODO: implement, see SPEC.md
	panic("TODO: FilterBooks")
}

// ValidateBook returns an error message per invalid field ("title", "author").
// An empty map means valid.
func ValidateBook(title string, author string) map[string]string {
	// TODO: implement, see SPEC.md
	panic("TODO: ValidateBook")
}
