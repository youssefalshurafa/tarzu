import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';

export async function POST(req: Request) {
  const { role, userId } = await req.json();

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
    },
  });
  return NextResponse.json({ success: true });
}
