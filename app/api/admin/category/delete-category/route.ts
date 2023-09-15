import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('id');

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (deletedCategory) {
      return NextResponse.json({ success: true, message: 'Category deleted!' });
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
