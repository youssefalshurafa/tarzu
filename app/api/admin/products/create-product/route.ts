import { connectToDB } from '@/database/mongoose';
import Product from '@/models/product.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const {
      title,
      code,
      description,
      price,
      category,
      stock,
      thumbnail,
      images,
    } = data;
    const newProduct = await Product.create({
      title,
      code,
      description,
      price,
      category,
      stock,
      thumbnail,
      images,
    });
    if (newProduct && newProduct.length) {
      return NextResponse.json({ success: true, data: newProduct });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'Could not create a new Product ',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
