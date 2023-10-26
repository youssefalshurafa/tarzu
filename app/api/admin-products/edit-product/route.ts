import { connectToDB } from '@/database/mongoose';
import Product from '@/models/product.model';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();

    const product = await Product.findOneAndUpdate(
      { _id: data._id },
      {
        title: data.title,
      },
      { upsert: true }
    );
    console.log('product: ', product);
    if (product) {
      return NextResponse.json({
        success: true,
        message: 'product updated successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to update the product ! Please try again later',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
