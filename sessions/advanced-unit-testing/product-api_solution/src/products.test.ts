import { afterEach, describe, expect, test, vi } from "vitest";
import { getProduct, getProductTitles } from "./products";

const mascara = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  price: 9.99,
};
const eyeshadow = {
  id: 2,
  title: "Eyeshadow Palette with Mirror",
  price: 19.99,
};

describe("getProduct", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("requests the product with the given id", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify(mascara)));

    await getProduct(1);

    expect(fetchSpy).toHaveBeenCalledWith("https://dummyjson.com/products/1");
  });

  test("resolves with the product from the response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mascara)),
    );

    await expect(getProduct(1)).resolves.toEqual(mascara);
  });

  test("rejects with 'Product 999 not found' for a 404 response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 404 }),
    );

    await expect(getProduct(999)).rejects.toThrow("Product 999 not found");
  });

  test("rejects with a friendly message if the network is down", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    await expect(getProduct(1)).rejects.toThrow(
      "Could not reach the product service",
    );
  });
});

describe("getProductTitles", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns the titles in the order of the given ids", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify(mascara)))
      .mockResolvedValueOnce(new Response(JSON.stringify(eyeshadow)));

    await expect(getProductTitles([1, 2])).resolves.toEqual([mascara.title, eyeshadow.title]);
  });

  test("sends one request per id", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify(mascara)))
      .mockResolvedValueOnce(new Response(JSON.stringify(eyeshadow)));

    await getProductTitles([1, 2]);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  test("returns an empty array without any request for an empty list", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(getProductTitles([])).resolves.toEqual([]);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("rejects if one of the products does not exist", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify(mascara)))
      .mockResolvedValueOnce(new Response(null, { status: 404 }));

    await expect(getProductTitles([1, 2])).rejects.toThrow("Product 2 not found");
  });
});
