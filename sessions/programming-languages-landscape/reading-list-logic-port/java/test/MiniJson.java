import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * A tiny JSON reader for the tests. The Java standard library has no JSON parser,
 * real projects use a library like Jackson or Gson. Do not change this file.
 * Returns Map (object), List (array), String, Double, Boolean or null.
 */
public class MiniJson {
    private final String text;
    private int pos = 0;

    private MiniJson(String text) {
        this.text = text;
    }

    public static Object parse(String text) {
        MiniJson parser = new MiniJson(text);
        Object value = parser.readValue();
        parser.skipWhitespace();
        if (parser.pos != text.length()) {
            throw new IllegalArgumentException("Unexpected text at position " + parser.pos);
        }
        return value;
    }

    private Object readValue() {
        skipWhitespace();
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
        skipWhitespace();
        if (text.charAt(pos) == '}') { pos++; return result; }
        while (true) {
            skipWhitespace();
            String key = readString();
            skipWhitespace();
            expect(':');
            result.put(key, readValue());
            skipWhitespace();
            if (text.charAt(pos) == ',') { pos++; continue; }
            expect('}');
            return result;
        }
    }

    private List<Object> readArray() {
        List<Object> result = new ArrayList<>();
        pos++; // [
        skipWhitespace();
        if (text.charAt(pos) == ']') { pos++; return result; }
        while (true) {
            result.add(readValue());
            skipWhitespace();
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
                default -> sb.append(escaped); // " \ /
            }
        }
        pos++; // closing quote
        return sb.toString();
    }

    private Double readNumber() {
        int start = pos;
        while (pos < text.length() && "+-0123456789.eE".indexOf(text.charAt(pos)) >= 0) pos++;
        return Double.valueOf(text.substring(start, pos));
    }

    private void expect(char c) {
        if (text.charAt(pos) != c) {
            throw new IllegalArgumentException("Expected '" + c + "' at position " + pos);
        }
        pos++;
    }

    private void skipWhitespace() {
        while (pos < text.length() && Character.isWhitespace(text.charAt(pos))) pos++;
    }
}
