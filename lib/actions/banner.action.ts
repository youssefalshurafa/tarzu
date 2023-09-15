export async function getBanner() {
  try {
    const res = await fetch(
      `${process.env.WEBSITE_URL}/api/admin/banner/get-banner`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch banner: ${error.message}`);
  }
}
