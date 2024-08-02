import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET() 
{
    const session= await getServerSession(authOptions)
        try{
            const products= await db.products.findMany({
                where: {
                  createdByUsername: session?.user.username,
                },
              });
        return NextResponse.json(products);
        }
        catch(error)
        {
            return NextResponse.json({message: "Something went wrong", status: 500});
        }
}