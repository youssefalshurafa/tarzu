import { connectToDB } from '@/database/mongoose';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const { userId, name, phoneNumber, email, address } = data;

    const userExists = await User.findOne({ id: userId });
    if (userExists) {
      return NextResponse.json({
        success: false,
        message: 'User already exists',
      });
    }
    const newUser = await User.create({
      id: userId,
      name,
      phoneNumber,
      email,
      address,
      onboarded: true,
      roles: {
        User: 2001,
      },
    });

    if (newUser) {
      return NextResponse.json({
        success: true,
        message: 'User created successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to create user ! Please try again later',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
}
