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
