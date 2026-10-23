export type Animal = {
  id: number;
  name: string;
  sound: string;
};

export async function getAnimal(id: number): Promise<Animal> {
  let response: Response;

  try {
    response = await fetch(`https://api.example.com/animals/${id}`);
  } catch {
    throw new Error("Could not reach the animal service");
  }

  if (!response.ok) {
    throw new Error(`Animal ${id} not found`);
  }

  return response.json();
}

export async function getAnimalSounds(ids: number[]): Promise<string[]> {
  const animals = await Promise.all(ids.map((id) => getAnimal(id)));

  return animals.map((animal) => animal.sound);
}
