import { beforeEach, describe, expect, test, vi } from "vitest";
import { getOrderTotal } from "./order";
import { getProduct } from "./products";

vi.mock("./products");

describe("getOrderTotal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getProduct).mockImplementation(async (id) => ({
      id,
      name: `Product ${id}`,
      price: id * 10,
    }));
  });

  test("adds up the prices of all products", async () => {
    await expect(getOrderTotal([1, 2, 3])).resolves.toBe(60);
  });

  test("returns 0 for an empty order", async () => {
    await expect(getOrderTotal([])).resolves.toBe(0);
  });

  test("loads every product exactly once", async () => {
    await getOrderTotal([4, 5]);

    expect(getProduct).toHaveBeenCalledTimes(2);
    expect(getProduct).toHaveBeenCalledWith(4);
    expect(getProduct).toHaveBeenCalledWith(5);
  });

  test("rejects if one of the products cannot be loaded", async () => {
    vi.mocked(getProduct).mockRejectedValueOnce(new Error("Product 1 not found"));

    await expect(getOrderTotal([1, 2])).rejects.toThrow("Product 1 not found");
  });
});
