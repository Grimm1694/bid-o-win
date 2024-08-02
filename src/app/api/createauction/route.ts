import { NextResponse } from "next/server";
import { db } from '@/src/lib/db';
import * as z from 'zod';

// Define a schema for auction data validation
const auctionSchema = z.object({
  productId: z.number().min(1, 'Product ID is required'),
  startBid: z.string().min(1, 'Start bid is required').regex(/^\d+(\.\d{1,2})?$/, 'Invalid bid amount format'),
  auctionDeadline: z.string().min(1, 'Auction end date is required').refine(date => !isNaN(Date.parse(date)), 'Invalid date format'),  userUsername: z.string().min(1, 'Username is required'),

});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validate and parse the request body

    const { productId, startBid, auctionDeadline, userUsername } = auctionSchema.parse(body);

    // Ensure startBid is a number
    const startBidAmount = parseFloat(startBid);
    // Create a new auction using Prisma
    const newAuction = await db.auction.create({
      data: {
        productId,
        startBid: startBidAmount,
        auctionDeadline: new Date(auctionDeadline),
        currentBid: startBidAmount, // Set current bid to start bid

        userUsername: userUsername,

    }});

    return NextResponse.json({
      auction: newAuction,
      message: "Auction created successfully",
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        errors: error.errors,
        status: 400,
      });
    }
    console.error("Error creating auction:", error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
