import type { ChangeEvent } from "react";
import type { StatusFilter } from "../types";

type SearchBarProps = {
  query: string;
  status: StatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: StatusFilter) => void;
};

export default function SearchBar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: SearchBarProps) {
  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    onQueryChange(event.target.value);
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>): void {
    onStatusChange(event.target.value as StatusFilter);
  }

  return (
    <div className="search-bar">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        placeholder="Title or author"
        value={query}
        onChange={handleQueryChange}
      />

      <label htmlFor="status">Status</label>
      <select id="status" value={status} onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="to-read">To read</option>
        <option value="reading">Reading</option>
        <option value="read">Read</option>
      </select>
    </div>
  );
}
