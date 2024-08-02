import { NextResponse } from 'next/server';
import { db } from '@/src/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const auctionId = parseInt(params.id);
    if (isNaN(auctionId)) {
      return NextResponse.json({ message: 'Invalid auction ID', status: 400 });
    }

    const auction = await db.auction.findFirst({
      where: { auctionId },
      include: {
        history: {
          include: { user: true },
          orderBy: { bidAmount: 'desc' },
          take: 1,
        },
      },     
    });

    if (!auction || auction.history.length === 0) {
      return NextResponse.json({ message: 'No bids found for this auction', status: 404 });
    }

    return NextResponse.json(auction);
  } catch (error) {
    console.error('Error fetching top bidder:', error);
    return NextResponse.json({ message: 'Something went wrong', status: 500 });
  }
}
