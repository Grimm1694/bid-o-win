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
        const products = await db.auction.findMany({
            where: {
                userUsername: session.user.username,
            },
            include: {
                product: true, // Include product details if needed
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching auctions:", error);
        return NextResponse.json({ message: "Something went wrong", status: 500 });
    }
}
