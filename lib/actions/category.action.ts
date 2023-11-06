'use server';

export async function getCategory() {
  try {
    const res = await fetch(
      ` ${process.env.WEBSITE_URL}/api/admin/category/get-category`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch category: ${error.message}`);
  }
}

export async function createCategory(formData: any) {
  try {
    const res = await fetch(
      ` ${process.env.WEBSITE_URL}/api/admin/category/create-category`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
}

export async function deleteCategory(categoryId: any) {
  try {
    const res = await fetch(
      `${process.env.WEBSITE_URL}/api/admin/category/delete-category?id=${categoryId}`,
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

export async function updateCategory(formData: any) {
  try {
    const res = await fetch(
      ` ${process.env.WEBSITE_URL}/api/admin/category/update-category`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
}

export async function getCategoryById(name: any) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/category/getById?name=${name}`,
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
          contentType: 'application/json',
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
