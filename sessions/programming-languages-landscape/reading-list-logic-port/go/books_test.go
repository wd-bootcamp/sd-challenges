// Run in this folder: go test
// Do not change this file. It reads the shared test cases from ../fixtures/cases.json.
package readinglist

import (
	"encoding/json"
	"os"
	"reflect"
	"testing"
)

type filterCase struct {
	Name        string   `json:"name"`
	Status      string   `json:"status"`
	Query       string   `json:"query"`
	ExpectedIDs []string `json:"expectedIds"`
}

type validateCase struct {
	Name  string `json:"name"`
	Input struct {
		Title  string `json:"title"`
		Author string `json:"author"`
	} `json:"input"`
	Expected map[string]string `json:"expected"`
}

type fixtures struct {
	Books        []Book            `json:"books"`
	StatusLabels map[string]string `json:"statusLabels"`
	FilterBooks  []filterCase      `json:"filterBooks"`
	ValidateBook []validateCase    `json:"validateBook"`
}

func loadFixtures(t *testing.T) fixtures {
	t.Helper()
	data, err := os.ReadFile("../fixtures/cases.json")
	if err != nil {
		t.Fatalf("cannot read ../fixtures/cases.json (run go test in the folder go of the starter): %v", err)
	}
	var f fixtures
	if err := json.Unmarshal(data, &f); err != nil {
		t.Fatalf("cannot parse cases.json: %v", err)
	}
	return f
}

// A panic (for example from a TODO) fails only the current test case, not the whole run.
func catchPanic(t *testing.T) {
	if r := recover(); r != nil {
		t.Fatalf("panic: %v", r)
	}
}

func TestStatusLabels(t *testing.T) {
	f := loadFixtures(t)
	if !reflect.DeepEqual(StatusLabels, f.StatusLabels) {
		t.Fatalf("expected %v but got %v", f.StatusLabels, StatusLabels)
	}
}

func TestFilterBooks(t *testing.T) {
	f := loadFixtures(t)
	for _, c := range f.FilterBooks {
		t.Run(c.Name, func(t *testing.T) {
			defer catchPanic(t)
			ids := []string{}
			for _, book := range FilterBooks(f.Books, c.Status, c.Query) {
				ids = append(ids, book.ID)
			}
			if !reflect.DeepEqual(ids, c.ExpectedIDs) {
				t.Fatalf("expected %v but got %v", c.ExpectedIDs, ids)
			}
		})
	}
}

func TestValidateBook(t *testing.T) {
	f := loadFixtures(t)
	for _, c := range f.ValidateBook {
		t.Run(c.Name, func(t *testing.T) {
			defer catchPanic(t)
			got := ValidateBook(c.Input.Title, c.Input.Author)
			if len(got) == 0 && len(c.Expected) == 0 {
				return
			}
			if !reflect.DeepEqual(got, c.Expected) {
				t.Fatalf("expected %v but got %v", c.Expected, got)
			}
		})
	}
}
