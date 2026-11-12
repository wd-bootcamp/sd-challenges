package books

import (
	"encoding/json"
	"maps"
	"os"
	"slices"
	"testing"
)

type fixtures struct {
	Books        []Book            `json:"books"`
	StatusLabels map[string]string `json:"statusLabels"`
	FilterCases  []struct {
		Name        string   `json:"name"`
		Status      string   `json:"status"`
		Query       string   `json:"query"`
		ExpectedIDs []string `json:"expectedIds"`
	} `json:"filterCases"`
}

func loadFixtures(t *testing.T) fixtures {
	t.Helper()
	data, err := os.ReadFile("../fixtures/cases.json")
	if err != nil {
		t.Fatal(err)
	}
	var f fixtures
	if err := json.Unmarshal(data, &f); err != nil {
		t.Fatal(err)
	}
	return f
}

func ids(books []Book) []string {
	result := []string{}
	for _, book := range books {
		result = append(result, book.ID)
	}
	return result
}

func TestFilterBooks(t *testing.T) {
	f := loadFixtures(t)
	for _, c := range f.FilterCases {
		t.Run(c.Name, func(t *testing.T) {
			got := ids(FilterBooks(f.Books, c.Status, c.Query))
			if !slices.Equal(got, c.ExpectedIDs) {
				t.Errorf("got %v, want %v", got, c.ExpectedIDs)
			}
		})
	}
}

func TestFilterBooksDoesNotChangeItsInput(t *testing.T) {
	f := loadFixtures(t)
	before := ids(f.Books)
	FilterBooks(f.Books, "done", "the")
	if !slices.Equal(ids(f.Books), before) {
		t.Error("the input list was changed")
	}
}

func TestStatusLabels(t *testing.T) {
	f := loadFixtures(t)
	if !maps.Equal(StatusLabels, f.StatusLabels) {
		t.Errorf("got %v, want %v", StatusLabels, f.StatusLabels)
	}
}
