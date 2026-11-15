import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * A tiny JSON parser, only used by the test. The JDK has no JSON library, and the starter
 * must not need a build tool or a download. Do not change this file and do not use it in Books.java.
 *
 * parse() returns: Map<String, Object> for an object, List<Object> for an array, String,
 * Double for a number, Boolean, or null.
 */
final class Json {
    private final String text;
    private int pos = 0;

    private Json(String text) {
        this.text = text;
    }

    static Object parse(String text) {
        Json parser = new Json(text);
        Object value = parser.readValue();
        parser.skipSpaces();
        if (parser.pos != text.length()) {
            throw parser.error("unexpected text after the JSON value");
        }
        return value;
    }

    private Object readValue() {
        skipSpaces();
        if (pos >= text.length()) {
            throw error("unexpected end of the text");
        }
        char c = text.charAt(pos);
        if (c == '{') return readObject();
        if (c == '[') return readArray();
        if (c == '"') return readString();
        if (text.startsWith("true", pos)) { pos += 4; return Boolean.TRUE; }
        if (text.startsWith("false", pos)) { pos += 5; return Boolean.FALSE; }
        if (text.startsWith("null", pos)) { pos += 4; return null; }
        return readNumber();
    }

    private Map<String, Object> readObject() {
        Map<String, Object> result = new LinkedHashMap<>();
        pos++; // {
        skipSpaces();
        if (text.charAt(pos) == '}') { pos++; return result; }
        while (true) {
            skipSpaces();
            String key = readString();
            skipSpaces();
            expect(':');
            result.put(key, readValue());
            skipSpaces();
            if (text.charAt(pos) == ',') { pos++; continue; }
            expect('}');
            return result;
        }
    }

    private List<Object> readArray() {
        List<Object> result = new ArrayList<>();
        pos++; // [
        skipSpaces();
        if (text.charAt(pos) == ']') { pos++; return result; }
        while (true) {
            result.add(readValue());
            skipSpaces();
            if (text.charAt(pos) == ',') { pos++; continue; }
            expect(']');
            return result;
        }
    }

    private String readString() {
        expect('"');
        StringBuilder sb = new StringBuilder();
        while (text.charAt(pos) != '"') {
            char c = text.charAt(pos++);
            if (c != '\\') { sb.append(c); continue; }
            char escaped = text.charAt(pos++);
            switch (escaped) {
                case 'n' -> sb.append('\n');
                case 't' -> sb.append('\t');
                case 'r' -> sb.append('\r');
                case 'b' -> sb.append('\b');
                case 'f' -> sb.append('\f');
                case 'u' -> { sb.append((char) Integer.parseInt(text.substring(pos, pos + 4), 16)); pos += 4; }
                default -> sb.append(escaped); // \" \\ \/
            }
        }
        pos++; // closing quote
        return sb.toString();
    }

    private Double readNumber() {
        int start = pos;
        while (pos < text.length() && "+-0123456789.eE".indexOf(text.charAt(pos)) >= 0) pos++;
        if (start == pos) throw error("unexpected character '" + text.charAt(pos) + "'");
        return Double.valueOf(text.substring(start, pos));
    }

    private void expect(char c) {
        if (pos >= text.length() || text.charAt(pos) != c) throw error("expected '" + c + "'");
        pos++;
    }

    private void skipSpaces() {
        while (pos < text.length() && Character.isWhitespace(text.charAt(pos))) pos++;
    }

    private IllegalArgumentException error(String message) {
        return new IllegalArgumentException("JSON error at position " + pos + ": " + message);
    }
}
