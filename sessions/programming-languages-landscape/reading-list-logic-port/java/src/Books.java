import java.util.List;
import java.util.Map;

/** The Reading List logic, ported from TypeScript (see ../typescript/books.ts and ../SPEC.md). */
public class Books {

    // TODO: the label of every status, see SPEC.md
    static final Map<String, String> STATUS_LABELS = Map.of();

    /** status is "want-to-read", "reading", "done" or "all". */
    static List<Book> filterBooks(List<Book> books, String status, String query) {
        // TODO: implement, see SPEC.md
        throw new UnsupportedOperationException("filterBooks");
    }

    /** Returns an error message per invalid field. An empty map means valid. */
    static Map<String, String> validateBook(String title, String author) {
        // TODO: implement, see SPEC.md
        throw new UnsupportedOperationException("validateBook");
    }
}
