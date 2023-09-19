import { ProductType } from '../Types';

export async function getAllProducts() {
  try {
    const res = await fetch(` /api/admin/products/get-all-products`, {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch Products: ${error.message}`);
  }
}

export async function createProduct(newProduct: ProductType) {
  try {
    const res = await fetch('/api/admin/category/create-category', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
}
