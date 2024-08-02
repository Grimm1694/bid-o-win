import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { db } from '@/src/lib/db'; // Assuming you're using Prisma
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const auction = await db.profile.findFirst({
      where: { userUsername: session?.user.username },
      
    });
    return NextResponse.json(auction);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}

export async function POST(req: any) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { user } = session;

  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      address,
      url,
      gender,
      bio,
      facebook,
      twitter,
    } = await req.json();
    // Update or create profile
    const userProfile = await db.profile.upsert({
      where: { userUsername: user.username },
      update: {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        address,
        url,
        gender,
        bio,
        facebook,
        twitter,
      },
      create: {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        address,
        url,
        gender,
        bio,
        facebook,
        twitter,
        user: { connect: { username: user.username } }, // Connect user to profile
      },
    });

    return NextResponse.json({ message: 'Profile updated successfully', profile: userProfile }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Internal server error', }, { status: 500 });
  }
}
