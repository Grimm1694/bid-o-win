import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, context: any) {
  try {
    const { id } = context.params;
    const auction = await db.auction.findFirst({
      where: { auctionId: Number(id) },
      include: {
        product: true, // Include the related product
        user: true,    // Include the related user
      },
    });
    return NextResponse.json(auction);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
export async function POST(req: any, context: any) {
    try {
      const { id } = context.params;
      const { bidAmount } = await req.json();
      const session= await getServerSession(authOptions);

      // Find the auction by ID
      const auction = await db.auction.findFirst({
        where: { auctionId: Number(id) },
      });
  
      if (!auction) {
        return NextResponse.json({ message: "Auction not found", status: 404 });
      }
        const updatedAuction = await db.auction.update({
          where: { auctionId: Number(id) },
          data: { currentBid: bidAmount },
        });
       
        await db.auctionHistory.create({
          data: {
            auctionId: parseInt(id),
            userUsername: session?.user.username ?? "Anonymous",
            bidAmount,
            bidTime: new Date(),
          },
        });
        return NextResponse.json(updatedAuction);
      
    } catch (error) {
      return NextResponse.json({ message: "Something went wrong", status: 500 });
    }
  }