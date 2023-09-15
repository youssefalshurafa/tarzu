export async function getCategory() {
  try {
    const res = await fetch('/api/admin/category/get-category', {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch category: ${error.message}`);
  }
}

export async function createCategory(formData: any) {
  try {
    const res = await fetch('/api/admin/category/create-category', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
}

export async function deleteCategory(categoryId: any) {
  try {
    const res = await fetch(
      `/api/admin/category/delete-category?id=${categoryId}`,
      {
        method: 'DELETE',
        body: JSON.stringify(categoryId),
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
}
