import { afterEach, describe, expect, test, vi } from "vitest";
import { getProduct } from "./products";

describe("getProduct", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("requests the product with the given id", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ id: 1, name: "Pen", price: 3 })),
      );

    await getProduct(1);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith("https://api.example.com/products/1");
  });

  test("resolves with the product from the response", async () => {
    const product = { id: 1, name: "Pen", price: 3 };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(product)),
    );

    await expect(getProduct(1)).resolves.toEqual(product);
  });

  test("rejects if the product does not exist", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 404 }),
    );

    await expect(getProduct(99)).rejects.toThrow("Product 99 not found");
  });

  test("rejects if the network is down", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    await expect(getProduct(1)).rejects.toThrow("Failed to fetch");
  });
});
