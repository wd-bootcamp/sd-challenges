import { getProduct } from "./products";

export async function getOrderTotal(productIds: number[]): Promise<number> {
  const products = await Promise.all(productIds.map((id) => getProduct(id)));

  return products.reduce((total, product) => total + product.price, 0);
}
