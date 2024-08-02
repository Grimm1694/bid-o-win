
"use client";
import Product from "@/src/components/Product";
import Auction from "@/src/components/Auction";
import { useEffect, useState } from "react";
import Hero from "@/src/components/hi";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [auction, setAuction] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log("Products:", data);
        setData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getAuction = async () => {
      try {
        const res = await fetch("/api/auctionlist");
        const auction = await res.json();
        console.log("Auctions:", auction);
        setAuction(auction);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    getAuction();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6 mt-[50px]">
            <h1 className="text-3xl font-bold">My Auctions</h1>
            <Link href="/Auction/create">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auction && auction.map((auction) => (
              <Auction key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6 mt-[50px]">
            <h1 className="text-3xl font-bold">My Auction Items</h1>
            <Link href="/product/create">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data && data.map((product) => (
              <Product key={product.id} products={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


