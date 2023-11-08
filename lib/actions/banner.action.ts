export async function getBanner() {
  try {
    const res = await fetch(
      `${process.env.WEBSITE_URL}/api/admin/banner/get-banner`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          contentType: 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch banner: ${error.message}`);
  }
}

export async function updateBanner(formData: any) {
  try {
    const res = await fetch('/api/admin/banner/update-banner', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to update banner: ${error.message}`);
  }
}
