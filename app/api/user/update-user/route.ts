import { connectToDB } from '@/database/mongoose';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const { userId, name, phoneNumber, email, address, newOrder } = data;
    console.log(newOrder);

    const updatedUser = await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        name,
        phoneNumber,
        email,
        address,
        $push: { orders: newOrder },
        onboarded: true,
      },
      {
        upsert: true,
      }
    );

    if (updatedUser) {
      return NextResponse.json({
        success: true,
        message: 'User updated successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to update user ! Please try again later',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
}
