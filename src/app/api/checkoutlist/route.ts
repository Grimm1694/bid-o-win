import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  try {
    // Fetch products based on the user's username
    const products = await db.checkout.findMany({
      where: {
        username: session.user.username,
      },
    });

    // Extract the auctionIds from the products
    const auctionIds = products.map((item) => item.auctionId);

    // Fetch auctions based on the auctionIds
    const auction = await db.auction.findMany({
        where: { auctionId: {in: auctionIds,} },
        include: {
          product: true, 
        },
      });
    return NextResponse.json({ auction });
  } catch (error) {
    console.error("Error fetching products or auctions:", error);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
