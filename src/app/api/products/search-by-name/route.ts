import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";
export async function GET(req :any,context :any) 
{
        try{
            const {name}=context.params;
            const items = await db.products.findMany({
                take:5,
                where:{
                    title:{
                        contains: name,
                        mode: "insensitive"
                    }
                }
            });
        await db.$disconnect();
        return NextResponse.json({items, message: "Product fetched successfully", status: 200});
        }
        catch(error)
        {
            await db.$disconnect();
            return NextResponse.json({message: "Something went wrong", status: 400});
        }
}