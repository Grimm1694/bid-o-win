"use client";
import './styles.css';
import Link from "next/link";

export default function Auction({ auction }: { auction: any }) {
    const formatTime = (time: string): string => {
        const deadline = new Date(time);
        const now = new Date();
        const diffTime = Math.max(deadline.getTime() - now.getTime(), 0);
        const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
        const hours = Math.floor((diffTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((diffTime % (60 * 60 * 1000)) / (60 * 1000));
        return `${days} days ${hours} hours ${minutes} minutes`;
    };

    return (
        <div>
            <Link href={`/Auction/${auction.auctionId}`}>
                {auction.product?.url ? (
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-auto h-auto md:h-[550px] lg:h-[465px] md:w-[400px] transition-transform duration-200 hover:-translate-y-1 mb-8">
                        <img src={auction.product?.url} alt="Product" className="w-full h-[300px] lg:h-[200px] object-cover object-center transition-transform duration-200 hover:scale-105" />
                        <div className="p-4 lg:p-6">
                            <h2 className="font-semibold text-lg lg:text-xl text-gray-800 mb-2 lg:mb-4">{auction.product?.title}</h2>
                            <p className="text-gray-700 mb-1 lg:mb-1">${auction?.currentBid}</p>
                            <p className="text-gray-700 mb-1 lg:mb-1">Categories : {auction.product?.category}</p>
                            <p className="text-gray-700 mb-1 lg:mb-1">Date : {formatTime(auction.auctionDeadline)}</p>
                            <p className="text-gray-700 mb-1 lg:mb-1">Owner: {auction?.userUsername}</p>
                            
                        </div>
                    </div>
                ) : null}
            </Link>
        </div>
    );
}
