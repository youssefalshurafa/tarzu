import { connectToDB } from '@/database/mongoose';
import Category from '@/models/category.model';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const { image, id, name } = data;
    if (!image) {
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: id },
        {
          name: name,
        },
        { upsert: true }
      );
      if (updatedCategory) {
        return NextResponse.json({
          success: true,
          message: 'Category updated successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to update the category ! Please try again later',
        });
      }
    } else if (!name) {
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id: id },
        {
          image: image,
        },
        { upsert: true }
      );
      if (updatedCategory) {
        return NextResponse.json({
          success: true,
          message: 'Category updated successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to update the category ! Please try again later',
        });
      }
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id: id },
        {
          name,
          image: image,
        },
        { upsert: true }
      );
      if (updatedCategory) {
        return NextResponse.json({
          success: true,
          message: 'Category updated successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to update the category ! Please try again later',
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
