export async function createOrder(newOrder: any) {
  try {
    const res = await fetch('/api/order/create-order', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
