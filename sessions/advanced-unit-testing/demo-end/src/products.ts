export type Product = {
  id: number;
  name: string;
  price: number;
};

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`https://api.example.com/products/${id}`);

  if (!response.ok) {
    throw new Error(`Product ${id} not found`);
  }

  return response.json();
}
