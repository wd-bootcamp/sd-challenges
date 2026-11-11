use reading_list_logic_port::{Book, filter_books, status_label};
use serde_json::Value;

fn fixtures() -> Value {
    let text = std::fs::read_to_string(concat!(env!("CARGO_MANIFEST_DIR"), "/../fixtures/cases.json"))
        .expect("cannot read fixtures/cases.json");
    serde_json::from_str(&text).expect("fixtures/cases.json is not valid JSON")
}

fn books(fixtures: &Value) -> Vec<Book> {
    serde_json::from_value(fixtures["books"].clone()).expect("cannot read the books")
}

#[test]
fn filter_cases_from_the_fixtures() {
    let fixtures = fixtures();
    let books = books(&fixtures);
    for case in fixtures["filterCases"].as_array().unwrap() {
        let name = case["name"].as_str().unwrap();
        let status = case["status"].as_str().unwrap();
        let query = case["query"].as_str().unwrap();
        let expected: Vec<&str> = case["expectedIds"]
            .as_array()
            .unwrap()
            .iter()
            .map(|id| id.as_str().unwrap())
            .collect();

        let result = filter_books(&books, status, query);
        let ids: Vec<&str> = result.iter().map(|book| book.id.as_str()).collect();
        assert_eq!(ids, expected, "case: {name}");
    }
}

#[test]
fn status_labels_from_the_fixtures() {
    let fixtures = fixtures();
    for (status, label) in fixtures["statusLabels"].as_object().unwrap() {
        assert_eq!(status_label(status), label.as_str(), "status: {status}");
    }
}
