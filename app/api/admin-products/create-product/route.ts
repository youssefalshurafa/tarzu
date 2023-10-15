import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import Product from '@/models/product.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const newProduct = await Product.create(data);
    await Category.findByIdAndUpdate(data.category, {
      $push: { products: newProduct._id },
    });
    if (newProduct) {
      return NextResponse.json({
        success: true,
        message: 'Product created successfully',
      });
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
