import { connectToDB } from '@/database/mongoose';
import Product from '@/models/product.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const products = await Product.find({});
    if (products && products.length) {
      return NextResponse.json({ success: true, data: products });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No category found',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
