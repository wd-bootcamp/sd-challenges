#[allow(dead_code)]
struct Book {
    title: String,
    author: String,
    status: String, // "want-to-read", "reading" or "done"
}

fn book(title: &str, author: &str, status: &str) -> Book {
    Book {
        title: title.to_string(),
        author: author.to_string(),
        status: status.to_string(),
    }
}

fn filter_books<'a>(books: &'a [Book], status: &str, query: &str) -> Vec<&'a Book> {
    let normalized_query = query.trim().to_lowercase();
    books
        .iter()
        .filter(|book| status == "all" || book.status == status)
        .filter(|book| book.title.to_lowercase().contains(&normalized_query))
        .collect()
}

fn main() {
    let books = vec![
        book("Dune", "Frank Herbert", "done"),
        book("The Hobbit", "J. R. R. Tolkien", "done"),
        book("Gone Girl", "Gillian Flynn", "want-to-read"),
        book("Neuromancer", "William Gibson", "reading"),
        book("The Name of the Wind", "Patrick Rothfuss", "want-to-read"),
        book("Klara and the Sun", "Kazuo Ishiguro", "done"),
    ];

    for book in filter_books(&books, "done", "the") {
        println!("{} ({})", book.title, book.status);
    }
}
