import { NextResponse } from "next/server";
import { db } from '@/src/lib/db';

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { uid, aid } = body;

    const newProduct = await db.checkout.create({
      data: {
        username: uid,
        auctionId: aid,
      },
    });

    return NextResponse.json({ products: newProduct, message: "Product created successfully", status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
