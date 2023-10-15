import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('id');
    const category = await Category.findOne({ _id: categoryId });
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
