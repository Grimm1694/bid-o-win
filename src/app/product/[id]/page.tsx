"use client";
import React, { useEffect, useState } from 'react';
import './styles.css';

const Page: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [currentBid, setCurrentBid] = useState(0);
    const [bidAmount, setBidAmount] = useState('');

    useEffect(() => {
        const countdown = (endDate: string) => {
            const targetDate = new Date(endDate).getTime();

            if (isNaN(targetDate)) return;

            const interval = setInterval(() => {
                const now = new Date().getTime();
                const timeRemaining = targetDate - now;

                if (timeRemaining >= 0) {
                    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                    setTimeLeft({
                        days,
                        hours,
                        minutes,
                        seconds,
                    });
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        };

        countdown('2024-06-31T00:00:00');
    }, []);

    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBidAmount(e.target.value);
    };

    const handlePlaceBid = () => {
        const bid = parseFloat(bidAmount);
        if (!isNaN(bid)) {
            setCurrentBid(bid);
            setBidAmount('');
        }
    };

    return (
      <div className =" mt-[800px]">
        <div className="box">
            <div style={{ backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', margin: '40px auto', padding: '24px', maxWidth: '400rem' }}>
                {/* Product Description Section */}
                <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', maxWidth: '700px', width: '100%', marginBottom: '32px' }}>
                    {/* Container for both small and main product images */}
                    <div style={{ display: 'flex', width: '100%' }}>
                        
                        {/* Main Product Image */}
                        <div style={{ width: '83.333333%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', paddingTop: '12px' }}>
                            <img style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '0.5rem' }} src="https://via.placeholder.com/300" alt="Product Image" />
                        </div>
                    </div>
                    {/* Product Details */}
                    <div style={{ marginBottom: '64px' }}> {/* Adjust the 32px to the desired space */}
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Product Name</h1>
                        <p style={{ color: '#4a5568', marginBottom: '16px' }}>Category: <span style={{ fontWeight: '500' }}>Category Name</span></p>
                        <p style={{ color: '#4a5568', marginBottom: '16px' }}>Weight: <span style={{ fontWeight: '500' }}>Category Name</span></p>
                        <p style={{ color: '#4a5568', marginBottom: '16px' }}>Price: <span style={{ fontWeight: '500' }}>$123.45</span></p>
                        <p style={{ color: '#4a5568', marginBottom: '16px' }}>Owner: <span style={{ fontWeight: '500' }}>Owner Name</span></p>
                        <p style={{ color: '#4a5568', marginBottom: '16px' }}>Description: <span style={{ fontWeight: '500' }}>description</span></p>
                    </div>
                </div>

                {/* Auction Countdown Section */}
                <div style={{ display: 'flex', flexDirection: 'column', width: '40%', padding: '24px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', height: 'auto', marginBottom: '32px' }}>
                    {/* Auction Countdown Title */}
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Auction Countdown</h1>

                    {/* Timer Section */}
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>Time Left</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ textAlign: 'center', margin: '0 8px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{timeLeft.days}</p>
                                <p style={{ color: '#4a5568' }}>Days</p>
                            </div>
                            <div style={{ textAlign: 'center', margin: '0 8px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{timeLeft.hours.toString().padStart(2, '0')}</p>
                                <p style={{ color: '#4a5568' }}>Hours</p>
                            </div>
                            <div style={{ textAlign: 'center', margin: '0 8px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{timeLeft.minutes.toString().padStart(2, '0')}</p>
                                <p style={{ color: '#4a5568' }}>Minutes</p>
                            </div>
                            <div style={{ textAlign: 'center', margin: '0 8px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{timeLeft.seconds.toString().padStart(2, '0')}</p>
                                <p style={{ color: '#4a5568' }}>Seconds</p>
                            </div>
                        </div>
                    </div>

                    {/* Current Bid Section */}
                    <div style={{ backgroundColor: '#f9fafb', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)', borderRadius: '0.5rem', padding: '16px', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Current Bid</h2>
                        <p style={{ fontSize: '1.25rem', color: '#4a5568' }}>${currentBid.toFixed(2)}</p>
                    </div>

                    {/* Place Bid Section */}
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Place Your Bid</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <input type="number" value={bidAmount} onChange={handleBidChange} style={{ padding: '8px', border: '1px solid #d2d6dc', borderRadius: '0.5rem', marginRight: '8px' }} placeholder="Enter bid amount" />
                            <button onClick={handlePlaceBid} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '0.5rem', transition: 'background-color 0.3s' }}>Place Bid</button>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <p style={{ fontSize: '0.75rem', color: '#718096', textAlign: 'center' }}>*Terms and conditions apply</p>
                </div>
            </div>

            {/* Leaderboard Section */}
            <div style={{ width: '100%', paddingTop: '30px', paddingRight: '500px' }}>
                <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '24px', height: '336px', marginBottom: '20px', width: '100%', maxWidth: '32rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Leaderboard</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', textAlign: 'left' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '16px' }}>Sl No</th>
                                    <th style={{ padding: '16px' }}>User Name</th>
                                    <th style={{ padding: '16px' }}>ID</th>
                                    <th style={{ padding: '16px' }}>Bid Price</th>
                                    <th style={{ padding: '16px' }}>Timing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example Data */}
                                <tr>
                                    <td style={{ border: '1px solid #d2d6dc', padding: '16px' }}>1</td>
                                    <td style={{ border: '1px solid #d2d6dc', padding: '16px' }}>John Doe</td>
                                    <td style={{ border: '1px solid #d2d6dc', padding: '16px' }}>12345</td>
                                    <td style={{ border: '1px solid #d2d6dc', padding: '16px' }}>$150.00</td>
                                    <td style={{ border: '1px solid #d2d6dc', padding: '16px' }}>12:34:56</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Page;