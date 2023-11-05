import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const category = await Category.findById(id);

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
