import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Plain Java test without a test library. Run it in the folder "java":
 *
 *   javac -d out src/*.java
 *   java -cp out BooksTest
 *
 * Do not change this file. It reads the shared test cases from ../fixtures/cases.json
 * and uses Json.java to parse them. The exit code is 1 when a test fails.
 */
public class BooksTest {
    static int passed = 0;
    static int failed = 0;

    public static void main(String[] args) throws IOException {
        Path file = Path.of("..", "fixtures", "cases.json");
        if (!Files.exists(file)) {
            System.err.println("Cannot find " + file.toAbsolutePath().normalize()
                    + ". Run this command in the folder \"java\" of the starter.");
            System.exit(2);
        }
        Map<String, Object> cases = asMap(Json.parse(Files.readString(file, StandardCharsets.UTF_8)));

        List<Book> books = new ArrayList<>();
        for (Object o : asList(cases.get("books"))) {
            Map<String, Object> b = asMap(o);
            Double rating = (Double) b.get("rating");
            books.add(new Book((String) b.get("id"), (String) b.get("title"), (String) b.get("author"),
                    (String) b.get("status"), rating == null ? null : Integer.valueOf(rating.intValue()),
                    (String) b.get("notes")));
        }

        run("STATUS_LABELS has the label of every status", () ->
                check(cases.get("statusLabels"), Books.STATUS_LABELS));

        for (Object o : asList(cases.get("filterBooks"))) {
            Map<String, Object> c = asMap(o);
            run("filterBooks: " + c.get("name"), () -> {
                List<String> ids = new ArrayList<>();
                for (Book book : Books.filterBooks(books, (String) c.get("status"), (String) c.get("query"))) {
                    ids.add(book.id());
                }
                check(c.get("expectedIds"), ids);
            });
        }

        for (Object o : asList(cases.get("validateBook"))) {
            Map<String, Object> c = asMap(o);
            run("validateBook: " + c.get("name"), () -> {
                Map<String, Object> input = asMap(c.get("input"));
                check(c.get("expected"), Books.validateBook((String) input.get("title"), (String) input.get("author")));
            });
        }

        System.out.println();
        System.out.println(passed + " passed, " + failed + " failed");
        if (failed > 0) System.exit(1);
    }

    static void run(String name, Runnable test) {
        try {
            test.run();
            passed++;
            System.out.println("PASS " + name);
        } catch (Throwable t) {
            failed++;
            System.out.println("FAIL " + name);
            System.out.println("     " + t);
        }
    }

    static void check(Object expected, Object actual) {
        if (!normalize(expected).equals(normalize(actual))) {
            throw new AssertionError("expected " + expected + " but got " + actual);
        }
    }

    // Maps compare without order, so a LinkedHashMap from the JSON equals a Map.of(...) from the port.
    static Object normalize(Object value) {
        if (value instanceof Map<?, ?> map) return new LinkedHashMap<Object, Object>(map).entrySet().stream()
                .collect(java.util.stream.Collectors.toMap(Map.Entry::getKey, e -> normalize(e.getValue())));
        if (value instanceof List<?> list) return list.stream().map(BooksTest::normalize).toList();
        return value;
    }

    @SuppressWarnings("unchecked")
    static Map<String, Object> asMap(Object o) {
        return (Map<String, Object>) o;
    }

    @SuppressWarnings("unchecked")
    static List<Object> asList(Object o) {
        return (List<Object>) o;
    }
}
