import { afterEach, describe, expect, test, vi } from "vitest";
import { getAnimal, getAnimalSounds } from "./animals";

const cat = { id: 1, name: "Cat", sound: "Meow" };
const dog = { id: 2, name: "Dog", sound: "Woof" };

describe("getAnimal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("requests the animal with the given id", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify(cat)));

    await getAnimal(1);

    expect(fetchSpy).toHaveBeenCalledWith("https://api.example.com/animals/1");
  });

  test("resolves with the animal from the response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(cat)),
    );

    await expect(getAnimal(1)).resolves.toEqual(cat);
  });

  test("rejects with 'Animal 99 not found' for a 404 response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 404 }),
    );

    await expect(getAnimal(99)).rejects.toThrow("Animal 99 not found");
  });

  test("rejects with a friendly message if the network is down", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    await expect(getAnimal(1)).rejects.toThrow(
      "Could not reach the animal service",
    );
  });
});

describe("getAnimalSounds", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns the sounds in the order of the given ids", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify(cat)))
      .mockResolvedValueOnce(new Response(JSON.stringify(dog)));

    await expect(getAnimalSounds([1, 2])).resolves.toEqual(["Meow", "Woof"]);
  });

  test("sends one request per id", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify(cat)))
      .mockResolvedValueOnce(new Response(JSON.stringify(dog)));

    await getAnimalSounds([1, 2]);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  test("returns an empty array without any request for an empty list", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(getAnimalSounds([])).resolves.toEqual([]);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("rejects if one of the animals does not exist", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify(cat)))
      .mockResolvedValueOnce(new Response(null, { status: 404 }));

    await expect(getAnimalSounds([1, 2])).rejects.toThrow("Animal 2 not found");
  });
});
