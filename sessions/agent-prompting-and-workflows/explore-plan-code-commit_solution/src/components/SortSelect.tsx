import type { ChangeEvent } from "react";
import type { SortOption } from "../types";

type SortSelectProps = {
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
};

export default function SortSelect({ sortBy, onSortChange }: SortSelectProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    onSortChange(event.target.value as SortOption);
  }

  return (
    <div className="sort-select">
      <label htmlFor="sort">Sort by</label>
      <select id="sort" value={sortBy} onChange={handleChange}>
        <option value="added">Recently added</option>
        <option value="title">Title (A–Z)</option>
        <option value="author">Author (A–Z)</option>
        <option value="rating">Rating (best first)</option>
      </select>
    </div>
  );
}
