"use client";
import Auction from "@/src/components/cout";
import { useEffect, useState } from "react";
import Hero from "@/src/components/hi";
import Link from "next/link";

export default function Home() {
  const [auctions, setAuctions] = useState<any[]>([]);

  useEffect(() => {
    const getAuctions = async () => {
      try {
        const res = await fetch("/api/checkoutlist");
        const data = await res.json();
        console.log("Fetched auctions:", data.auction);
        setAuctions(data.auction); // Set the state to the correct part of the response
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    getAuctions();
  }, []);

  console.log("Auction state:", auctions); // Log the auction state to check its structure

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6 mt-[50px]">
            <h1 className="text-3xl font-bold">My Checkout</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions && auctions.length > 0 ? (
              auctions.map((auctionItem) => (
                <Auction key={auctionItem.auctionId} auction={auctionItem} />
              ))
            ) : (
              <p>No auctions available</p>
            )}
          </div>
        </div>
      </div>
      <Hero title={"sharan"} description={"reddy"} imageUrl={""} />
    </div>
  );
}
