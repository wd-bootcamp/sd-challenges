/** One book of the reading list. The status is "want-to-read", "reading" or "done". */
public record Book(
        String id,
        String title,
        String author,
        String status,
        Integer rating, // 1 to 5, null means "not rated"
        String notes) {}
