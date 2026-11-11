import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/** Runs the shared fixtures against Books. Run it from the `java` folder, see the README. */
public class BooksTest {
    private static int failures = 0;

    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        String json = Files.readString(Path.of("../fixtures/cases.json"));
        Map<String, Object> fixtures = (Map<String, Object>) MiniJson.parse(json);

        List<Book> books = new ArrayList<>();
        for (Object item : (List<Object>) fixtures.get("books")) {
            Map<String, Object> data = (Map<String, Object>) item;
            Double rating = (Double) data.get("rating");
            books.add(new Book(
                    (String) data.get("id"),
                    (String) data.get("title"),
                    (String) data.get("author"),
                    (String) data.get("status"),
                    rating == null ? null : rating.intValue(),
                    (String) data.get("notes")));
        }

        for (Object item : (List<Object>) fixtures.get("filterCases")) {
            Map<String, Object> testCase = (Map<String, Object>) item;
            String name = (String) testCase.get("name");
            check(name, () -> {
                List<Book> result = Books.filterBooks(
                        books, (String) testCase.get("status"), (String) testCase.get("query"));
                return result.stream().map(Book::id).toList().equals(testCase.get("expectedIds"));
            });
        }

        check("does not change the list it receives", () -> {
            List<Book> copy = List.copyOf(books);
            Books.filterBooks(books, "done", "the");
            return books.equals(copy);
        });

        check("status labels", () -> Books.STATUS_LABELS.equals(fixtures.get("statusLabels")));

        System.out.println(failures == 0 ? "All tests passed" : failures + " test(s) failed");
        System.exit(failures == 0 ? 0 : 1);
    }

    private static void check(String name, java.util.function.BooleanSupplier test) {
        try {
            if (test.getAsBoolean()) {
                System.out.println("PASS " + name);
            } else {
                System.out.println("FAIL " + name);
                failures++;
            }
        } catch (Exception e) {
            System.out.println("FAIL " + name + " (" + e + ")");
            failures++;
        }
    }
}
