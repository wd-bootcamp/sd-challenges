export function generateCouponCode(): string {
  return "SAVE" + Math.floor(Math.random() * 100);
}

export function isValidCoupon(code: string): boolean {
  return code === "SAVE10" || code === "SAVE10";
}
