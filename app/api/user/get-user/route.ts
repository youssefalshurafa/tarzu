import { connectToDB } from '@/database/mongoose';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'User id is required',
      });
    }

    const getData = await User.find({ id: userId });

    if (getData && getData.length) {
      return NextResponse.json({ success: true, data: getData[0] });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No User found',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong !',
    });
  }
}
