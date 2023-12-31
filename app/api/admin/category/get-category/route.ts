import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import Product from '@/models/product.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const product = await Product.find();
    const category = await Category.find().populate({
      path: 'products',
      populate: { path: 'category', model: 'Category' },
    });

    if (category && category.length) {
      return NextResponse.json({ success: true, data: category });
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
