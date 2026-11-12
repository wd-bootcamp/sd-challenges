public record Book(
        String id,
        String title,
        String author,
        String status, // "want-to-read", "reading" or "done"
        Integer rating, // 1 to 5, null means "not rated"
        String notes) {}
