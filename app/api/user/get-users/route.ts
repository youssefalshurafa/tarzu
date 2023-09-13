import { connectToDB } from '@/database/mongoose';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const users = await User.find({});
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
}
