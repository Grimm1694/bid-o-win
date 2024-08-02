import { NextResponse } from "next/server";
import { db } from '@/src/lib/db';
import * as z from 'zod';

// Define a schema for product data validation
const productSchema = z.object({
  title: z.string().min(1, 'Product title is required').max(100),
  price: z.string().min(0, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().min(1, 'Product URL is required').url('Invalid URL format'),
  weight: z.string().min(1, 'Product weight is required'),
  category: z.string().min(1, 'Product category is required'),
  createdByUsername: z.string().min(1, 'Username is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Ensure price is a number
    const intprice = parseFloat(body.price);
    const { title, price, description, url, weight, category, createdByUsername } = productSchema.parse(body);
    // Create a new product using Prisma
    const newProduct = await db.products.create({
      data: {
        title,
        price: intprice,
        description,
        url,
        weight,
        category,
        createdByUsername: createdByUsername ?? "Anonymous",
      },
    });

    return NextResponse.json({ products: newProduct, message: "Product created successfully", status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors, status: 400 });
    }
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
