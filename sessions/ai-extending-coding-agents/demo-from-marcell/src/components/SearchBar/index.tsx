export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      Search
      <input
        type="search"
        value={value}
        placeholder="Title or author"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
