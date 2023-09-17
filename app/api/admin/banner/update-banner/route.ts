import { connectToDB } from '@/database/mongoose';
import Banner from '@/models/banner.model';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const { id, imgUrl, imgKey } = data;
    const updatedBanner = await Banner.findOneAndUpdate(
      {
        _id: id,
      },
      {
        imgUrl,
        imgKey,
      },
      {
        upsert: true,
      }
    );
    if (updatedBanner) {
      return NextResponse.json({
        success: true,
        message: 'Banner updated successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to update the banner ! Please try again later',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
