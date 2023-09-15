import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const { name, image } = data;

    const nameExists = await Category.findOne({ name });
    if (nameExists) {
      return NextResponse.json({
        success: false,
        message: 'Category already exists',
      });
    }
    const newCategory = await Category.create({
      name,
      image,
    });
    if (newCategory) {
      return NextResponse.json({
        success: true,
        message: 'Category created successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to create category ! Please try again later',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
}
