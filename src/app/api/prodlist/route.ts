import { NextResponse } from 'next/server';
import { db } from '@/src/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.username) {
      return NextResponse.json({ message: 'User not authenticated', status: 401 });
    }

    const products = await db.products.findMany({
      select: {
        id: true,
        title: true,
      },
      where: {
        createdByUsername: session.user.username,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ message: 'Failed to fetch products', status: 500 });
  }
}
