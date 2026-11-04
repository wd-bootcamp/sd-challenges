export function formatRating(rating: number): string {
  return rating > 0 ? `${rating} of 5` : "not rated";
}
