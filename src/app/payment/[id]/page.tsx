"use client";
import CheckoutPage from "@/src/components/CheckoutPage";
import convertToSubcurrency from "@/src/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { set } from "zod";
import axios from "axios";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home({ params }: any) {
    const [amount, setAmount] = useState<number>(0);
    const { data: session } = useSession();
    const [Aid, setAid] = useState<number>(0);
    const [usernames, setUsernames] = useState<string>("");
    useEffect(() => {
      const fetchBidStatus = async () => {
        if (session?.user?.username) {
          try {
              const res = await fetch(`/api/paymentcheck/${(params as any).id}}`); 
              const data = await res.json();
            const topBidder = data;
              console.log(topBidder.history[0].userUsername)
              console.log("bid amount",data.history[0].bidAmount)
              console.log(" user ",session.user.username);
            if (topBidder.history[0].userUsername == session.user.username && data.history[0].bidAmount>0 ) {
              const amount= data.history[0].bidAmount;
              console.log("amount",amount);
              const uid= data.history[0].userUsername;
              const aid= data.auctionId;
              setAmount(amount);
              setAid(data.auctionId);
              setUsernames(data.history[0].userUsername);
              console.log("uid",uid);
              console.log("aid",aid);
              const createAuctionResponse = await axios.post('/api/checkout', {uid,aid});
              console.log(createAuctionResponse.data);
            } else {
              setAmount(10)
            }
          } catch (error) {
            console.error('Error fetching auction result:', error);

          }
          
        }
      };
  
      fetchBidStatus();
    }, [session]);
  
    if(amount==0){
      setAmount(1);
    }
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">{session?.user.username}</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} username={usernames} auctionId={Aid} />
      </Elements>
    </main>
  );
}