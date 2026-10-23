export function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(2).replace(".", ",")} €`;
}

export function applyDiscount(price: number, percent: number): number {
  if (percent < 0 || percent > 100) {
    throw new RangeError("Discount must be between 0 and 100");
  }

  return price - (price * percent) / 100;
}
