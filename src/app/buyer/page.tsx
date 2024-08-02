"use client";
import React from 'react';
import { useEffect, useState } from "react";
import Hero from "@/src/components/hi";
import Link from "next/link";
import Auction from "@/src/components/Auction1";
const ProductGrid: React.FC = () => {
    const [auction, setAuction] = useState<any[]>([]);
  
    useEffect(() => {
        const getAuction = async () => {
          try {
            const res = await fetch("/api/buyer");
            const auction = await res.json();
            console.log("Auctions:", auction);
            setAuction(auction);
          } catch (error) {
            console.error("Error fetching auctions:", error);
          }
        };
        getAuction();
      }, []);
    const toggleMenu = () => {
        const menu = document.querySelector('.mobile-menu');
        if (menu) menu.classList.toggle('hidden');
    };

    return (
        <div className="bg-[#d9c19d]">
            <nav
                className="bg-white shadow-lg"
                style={{ transition: 'all 0.3s ease-in-out' }}
                onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#f3f4f6';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <div>
                                <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                    <svg className="h-6 w-6 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zM12 14c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zM12 2c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
                                    </svg>
                                    <span className="font-bold">Antique Shop</span>
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#" className="py-2 px-3 bg-gray-500 text-white rounded-full hover:bg-blue-700 transition duration-300">Register</a>
                            <a href="#" className="py-2 px-3 bg-gray-500 text-white rounded-full hover:bg-green-700 transition duration-300">Login</a>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="mobile-menu-button" onClick={toggleMenu}>
                                <svg className="w-6 h-6 text-gray-700 hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
    
            <div className="container mx-auto py-12">
                <div className="flex flex-col lg:flex-row items-center mb-6">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-[#724a24] mb-4"style={{ fontFamily: 'script, sans-serif' }}>Welcome to Bid-o-Win</h1>
                        <p className="text-lg text-[#724a24]">Discover unique antique pieces and start bidding today!</p>
                    </div>
                    <div className="flex-1 mt-6 lg:mt-0">
                        <img src="https://www.adpushup.com/blog/wp-content/uploads/2020/05/post-bidding.jpg" alt="Bidding" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
    
            <div className="container  mx-auto mb-6 flex justify-center">
                <input type="text" placeholder="Search products..." className="py-2 px-4 border border-gray-300 rounded-full w-2/3 md:w-1/3" />
                <button className="py-2 px-4 bg-[#724a24] hover:bg-[#d9c19d] text-[#b7966b] font-bold py-2 px-4 rounded transition duration-300">Search</button>
            </div>
    
            <div className="container mx-auto" style={{ backgroundColor: '#724a24' }}>
                <h2 className="text-3xl font-semibold p-6 text-center text-[#b7966b] mb-6">List of Products</h2>
                <div className="bg-[#d9c19d] min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex justify-between items-center mb-6 mt-[50px]">
                            <h1 className="text-3xl font-bold">My Auctions</h1>
                            
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {auction && auction.map((auction) => (
                                <div key={auction.id} className="bg-[#724a24] rounded-lg p-4 shadow-md">
                                    <Auction auction={auction} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductGrid;
    