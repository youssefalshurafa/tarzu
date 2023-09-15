import { connectToDB } from '@/database/mongoose';
import Banner from '@/models/banner.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const banner = await Banner.find({});
    if (banner && banner.length) {
      return NextResponse.json({ success: true, data: banner });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No banner found',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
