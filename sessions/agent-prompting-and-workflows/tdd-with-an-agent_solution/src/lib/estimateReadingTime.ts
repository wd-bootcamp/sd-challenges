export function estimateReadingTime(pages: number, pagesPerHour = 40): string {
  if (!Number.isInteger(pages) || pages <= 0) {
    throw new Error("pages must be a positive whole number");
  }

  if (!(pagesPerHour > 0)) {
    throw new Error("pagesPerHour must be greater than 0");
  }

  const exactMinutes = (pages / pagesPerHour) * 60;
  const roundedMinutes = Math.round(exactMinutes / 5) * 5;

  if (roundedMinutes === 0) {
    return "less than 5 min";
  }

  if (roundedMinutes < 60) {
    return `about ${roundedMinutes} min`;
  }

  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;

  return minutes === 0 ? `about ${hours} h` : `about ${hours} h ${minutes} min`;
}
