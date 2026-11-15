//! The Reading List logic, ported from TypeScript (see ../typescript/books.ts and ../SPEC.md).

use std::collections::BTreeMap;

use serde::Deserialize;

/// One book of the reading list.
#[derive(Debug, Clone, PartialEq, Deserialize)]
pub struct Book {
    pub id: String,
    pub title: String,
    pub author: String,
    pub status: String, // "want-to-read", "reading" or "done"
    pub rating: Option<u8>, // 1 to 5, None means "not rated"
    pub notes: String,
}

/// The label of every status. The key is the status, the value is the label.
pub fn status_labels() -> BTreeMap<String, String> {
    // TODO: implement, see SPEC.md
    todo!("status_labels")
}

/// `status` is "want-to-read", "reading", "done" or "all".
pub fn filter_books<'a>(books: &'a [Book], status: &str, query: &str) -> Vec<&'a Book> {
    // TODO: implement, see SPEC.md
    let _ = (books, status, query);
    todo!("filter_books")
}

/// Returns an error message per invalid field (the keys "title" and "author").
/// An empty map means valid.
pub fn validate_book(title: &str, author: &str) -> BTreeMap<String, String> {
    // TODO: implement, see SPEC.md
    let _ = (title, author);
    todo!("validate_book")
}
