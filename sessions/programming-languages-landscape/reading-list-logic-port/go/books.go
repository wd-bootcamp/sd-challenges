package books

// Book is one entry of the reading list.
type Book struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Status string `json:"status"` // "want-to-read", "reading" or "done"
	Rating *int   `json:"rating"` // 1 to 5, nil means "not rated"
	Notes  string `json:"notes"`
}

// StatusLabels maps a status to its label.
// TODO: the labels of the three statuses (see fixtures/cases.json)
var StatusLabels = map[string]string{}

// FilterBooks returns the books that match status ("all" or one status) and the title query.
func FilterBooks(books []Book, status string, query string) []Book {
	// TODO: implement, run the tests, repeat
	panic("FilterBooks is not implemented yet")
}
