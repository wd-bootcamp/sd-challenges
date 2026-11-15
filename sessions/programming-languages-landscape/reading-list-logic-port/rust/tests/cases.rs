// Run in this folder: cargo test
// Do not change this file. It reads the shared test cases from ../fixtures/cases.json.
use std::collections::BTreeMap;
use std::fs;

use reading_list::{Book, filter_books, status_labels, validate_book};
use serde::Deserialize;

#[derive(Deserialize)]
struct FilterCase {
    name: String,
    status: String,
    query: String,
    #[serde(rename = "expectedIds")]
    expected_ids: Vec<String>,
}

#[derive(Deserialize)]
struct ValidateInput {
    title: String,
    author: String,
}

#[derive(Deserialize)]
struct ValidateCase {
    name: String,
    input: ValidateInput,
    expected: BTreeMap<String, String>,
}

#[derive(Deserialize)]
struct Fixtures {
    books: Vec<Book>,
    #[serde(rename = "statusLabels")]
    status_labels: BTreeMap<String, String>,
    #[serde(rename = "filterBooks")]
    filter_books: Vec<FilterCase>,
    #[serde(rename = "validateBook")]
    validate_book: Vec<ValidateCase>,
}

fn load_fixtures() -> Fixtures {
    let path = concat!(env!("CARGO_MANIFEST_DIR"), "/../fixtures/cases.json");
    let text = fs::read_to_string(path)
        .unwrap_or_else(|e| panic!("cannot read {path} (keep the folder structure of the starter): {e}"));
    serde_json::from_str(&text).expect("cannot parse cases.json")
}

fn fail_if_any(failures: Vec<String>) {
    assert!(failures.is_empty(), "{} case(s) failed:\n{}", failures.len(), failures.join("\n"));
}

#[test]
fn status_labels_has_the_label_of_every_status() {
    let fixtures = load_fixtures();
    assert_eq!(status_labels(), fixtures.status_labels);
}

#[test]
fn filter_books_cases() {
    let fixtures = load_fixtures();
    let mut failures = Vec::new();
    for case in &fixtures.filter_books {
        let ids: Vec<String> = filter_books(&fixtures.books, &case.status, &case.query)
            .iter()
            .map(|book| book.id.clone())
            .collect();
        if ids != case.expected_ids {
            failures.push(format!("  {}: expected {:?} but got {:?}", case.name, case.expected_ids, ids));
        }
    }
    fail_if_any(failures);
}

#[test]
fn validate_book_cases() {
    let fixtures = load_fixtures();
    let mut failures = Vec::new();
    for case in &fixtures.validate_book {
        let errors = validate_book(&case.input.title, &case.input.author);
        if errors != case.expected {
            failures.push(format!("  {}: expected {:?} but got {:?}", case.name, case.expected, errors));
        }
    }
    fail_if_any(failures);
}
