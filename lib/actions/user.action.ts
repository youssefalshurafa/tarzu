export async function getUser(userId: string) {
  try {
    const res = await fetch(
      ` ${process.env.WEBSITE_URL}/api/user/get-user?id=${userId} `,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser(formData: any) {
  try {
    const res = await fetch('/api/user/update-user', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}
export async function addOrder(newOrder: any) {
  try {
    const res = await fetch('/api/user/add-order', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(newOrder),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function createUser(formData: any) {
  try {
    const res = await fetch('/api/user/create-user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
