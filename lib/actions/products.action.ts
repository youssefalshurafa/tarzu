import { ProductType } from '../Types';

export async function getAllProducts() {
  try {
    const res = await fetch(` /api/admin-products/get-all-products`, {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch Products: ${error.message}`);
  }
}

export async function createProduct(newProduct: any) {
  try {
    const res = await fetch('/api/admin-products/create-product', {
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

export async function deleteProduct(productId: any) {
  try {
    const res = await fetch(
      `/api/admin-products/delete-product?id=${productId}`,
      {
        method: 'DELETE',
        body: JSON.stringify(productId),
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
}
