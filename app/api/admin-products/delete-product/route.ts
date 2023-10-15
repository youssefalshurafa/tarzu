import { connectToDB } from '@/database/mongoose';
import Product from '@/models/product.model';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('id');

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      return NextResponse.json({ success: true, message: 'Product deleted!' });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No Category found',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
