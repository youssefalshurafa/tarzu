import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import { NextResponse } from 'next/server';
import Product from '@/models/product.model';
export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    const product = await Product.find();
    const category = await Category.findOne({ name: name }).populate({
      path: 'products',
      populate: { path: 'category', model: 'Category' },
    });

    if (category) {
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
