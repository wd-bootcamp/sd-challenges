use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
pub struct Book {
    pub id: String,
    pub title: String,
    pub author: String,
    pub status: String, // "want-to-read", "reading" or "done"
    pub rating: Option<u8>, // 1 to 5, None means "not rated"
    pub notes: String,
}

/// The label of a status, or `None` for an unknown status.
/// TODO: the labels of the three statuses (see fixtures/cases.json)
pub fn status_label(_status: &str) -> Option<&'static str> {
    todo!("status_label is not implemented yet")
}

/// Returns the books that match `status` ("all" or one status) and the title query.
pub fn filter_books(_books: &[Book], _status: &str, _query: &str) -> Vec<Book> {
    // TODO: implement, run the tests, repeat
    todo!("filter_books is not implemented yet")
}
