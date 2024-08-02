import { NextResponse } from 'next/server';
import { db } from '@/src/lib/db';
export async function GET(req: Request, { params }: { params: { id: any} }) 
{
  const { id } = params;
  try {
    const auctionHistory = await db.auctionHistory.findMany({
      where: { auctionId: parseInt(id) },
      include: { user: true },
      orderBy: { bidTime: 'desc' },
    });
      
    return NextResponse.json(auctionHistory);
  } catch (error) {
    console.error('Error fetching auction history:', error);
    return NextResponse.json({ message: 'Something went wrong', status: 500 });
  }
}
