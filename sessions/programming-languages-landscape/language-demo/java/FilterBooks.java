import java.util.List;

public class FilterBooks {

    record Book(String title, String author, String status) {}

    static List<Book> filterBooks(List<Book> books, String status, String query) {
        String normalizedQuery = query.strip().toLowerCase();
        return books.stream()
                .filter(book -> status.equals("all") || book.status().equals(status))
                .filter(book -> book.title().toLowerCase().contains(normalizedQuery))
                .toList();
    }

    public static void main(String[] args) {
        List<Book> books = List.of(
                new Book("Dune", "Frank Herbert", "done"),
                new Book("The Hobbit", "J. R. R. Tolkien", "done"),
                new Book("Gone Girl", "Gillian Flynn", "want-to-read"),
                new Book("Neuromancer", "William Gibson", "reading"),
                new Book("The Name of the Wind", "Patrick Rothfuss", "want-to-read"),
                new Book("Klara and the Sun", "Kazuo Ishiguro", "done"));

        for (Book book : filterBooks(books, "done", "the")) {
            System.out.println(book.title() + " (" + book.status() + ")");
        }
    }
}
