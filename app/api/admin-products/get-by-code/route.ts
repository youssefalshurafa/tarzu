import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import { NextResponse } from 'next/server';
import Product from '@/models/product.model';
export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const category = await Category.find();
    const product = await Product.findOne({ code: code }).populate({
      path: 'category',
      model: 'Category',
    });

    if (product) {
      return NextResponse.json({ success: true, data: product });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No product found',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
