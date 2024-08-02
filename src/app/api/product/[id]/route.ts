import { db } from "@/src/lib/db";

import { NextResponse } from "next/server";

export async function GET(req: any, context: any) 
{
    try{
        const { id } = context.params;
        const product= await db.products.findFirst({
            where: {id: Number(id)}
        });
    return NextResponse.json(product);
    }
    catch(error)
    {
        return NextResponse.json({message: "Something went wrong", status: 500});
    }
}