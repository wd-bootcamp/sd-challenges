import type { Item } from "./types";

export function calc(i: Item[], t: string, c?: string): number {
  let tot = 0;
  for (let x = 0; x < i.length; x++) {
    tot = tot + i[x].price * i[x].quantity;
  }
  // TODO: remove the old discount logic
  // if (t == "vip") { tot = tot * 0.8 }
  if (t === "vip") {
    if (c === "SAVE10") {
      tot = tot * 0.85 - 10;
      if (tot < 0) {
        tot = 0;
      }
    } else {
      tot = tot * 0.85;
    }
  } else if (t === "member") {
    if (c === "SAVE10") {
      tot = tot * 0.95 - 10;
      if (tot < 0) {
        tot = 0;
      }
    } else {
      tot = tot * 0.95;
    }
  } else {
    if (c === "SAVE10") {
      tot = tot - 10;
      if (tot < 0) {
        tot = 0;
      }
    } else {
      tot = tot;
    }
  }
  if (tot < 50) {
    tot = tot + 4.99;
  } else {
    tot = tot + 0;
  }
  return Math.round(tot * 100) / 100;
}
