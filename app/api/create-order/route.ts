import { connectToDB } from '@/database/mongoose';
import Order from '@/models/Order.model';
import User from '@/models/user.model';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const { user } = data;
    console.log(data);

    const newOrder = await Order.create(data);

    if (newOrder) {
      await User.findOneAndUpdate(
        { id: user },
        {
          $push: { orders: newOrder._id },
        }
      );
      return NextResponse.json({
        success: true,
        message: 'Order created successfully',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
}
