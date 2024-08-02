"use client";
import { useEffect, useState } from "react";
import axios from 'axios';

import { useRouter } from "next/navigation";

export default function Home({ params }: any) {
  const [auctionData, setAuctionData] = useState<any>(null);
  const [auctionHistory, setAuctionHistory] = useState<any[]>([]);
  const [currentBid, setCurrentBid] = useState(0);   
  const [bidAmount, setBidAmount] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter() 

  const getAuctionData = async () => {
    const res = await fetch(`/api/auction/${(params as any).id}`);
    const data = await res.json();
    setAuctionData(data);

    setCurrentBid(data.currentBid);  // Set initial current bid

  };

  useEffect(() => {
    getAuctionData();

  }, [params]);

  useEffect(() => {
    if (auctionData?.auctionDeadline) {
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

            router.push(`/postauction/${auctionData.auctionId}`);
          }
        }, 1000);
      };
      countdown(auctionData.auctionDeadline);
    }
  }, [auctionData?.auctionDeadline]);

  useEffect(() => {
    const fetchAuctionHistory = async () => {
      if (auctionData?.auctionId) {
        const response = await fetch(`/api/auctionhistory/${auctionData.auctionId}`);
        const data = await response.json();
        setAuctionHistory(data);
      }
    };
    fetchAuctionHistory();
  }, [auctionData?.auctionId]);

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(e.target.value);
  };
  const fetchAuctionHistory = async () => {
    if (auctionData?.auctionId) {
      const response = await fetch(`/api/auctionhistory/${auctionData.auctionId}`);
      const data = await response.json();
      setAuctionHistory(data);
    }
  };

  const handlePlaceBid = async () => {
    const bid = parseFloat(bidAmount);
    if (isNaN(bid)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    const currentBid=auctionData.currentBid;

    if (bid <= currentBid) {
      alert("New bid must be greater than the current bid.");
      return;
    }
    try {
      const response = await axios.post(`/api/auction/${auctionData.auctionId}`, { bidAmount: bid });
      setCurrentBid(response.data.currentBid);
      setBidAmount('');
      await getAuctionData(); // Fetch the updated auction data
      await fetchAuctionHistory(); // Fetch the updated auction history
    } catch (error) {
      console.error("Failed to place bid:", error);
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const formatDateTime = (dateTimeString: string | number | Date) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString(); // Customize the format as needed
  };

  return (
    <div style={{
      backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20231230/pngtree-texture-rich-dark-blue-abstract-design-with-realistic-line-elements-image_13891490.png")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      padding: '30px',
      color: '#2d3748',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh'
  }}>
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          margin: '40px auto',
          maxWidth: '112rem',
          padding: '0 5px',
          width: '90%'
      }}>
          {/* Product Description Section */}
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              width: '45%',
              transition: 'transform 0.3s ease-in-out',
              backgroundColor: 'white',
          }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '16px' }}>
                  <img
                      style={{
                          width: '400px',
                          height: '300px',
                          objectFit: 'cover',
                          borderRadius: '0.2rem',
                          transition: 'transform 0.3s ease-in-out'
                      }}
                      src={auctionData?.product?.url}
                      alt="Product Image"
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
              </div>
              <div style={{ marginBottom: '64px', textAlign: 'left', width: '100%' }}>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#2c5282' }}>{auctionData?.product?.title}</h1>
                  <p style={{ color: '#4a5568', marginBottom: '16px' }}>Category: <span style={{ fontWeight: '500' }}>{auctionData?.product?.category}</span></p>
                  <p style={{ color: '#4a5568', marginBottom: '16px' }}>Price: <span style={{ fontWeight: '500' }}>${auctionData?.product?.price}</span></p>
                  <p style={{ color: '#4a5568', marginBottom: '16px' }}>Owner: <span style={{ fontWeight: '500' }}>{auctionData?.user?.username}</span></p>
                  <p style={{ color: '#4a5568', marginBottom: '16px' }}>Description: <span style={{ fontWeight: '500' }}>{auctionData?.product?.description}</span></p>
              </div>
          </div>

          {/* Auction Countdown Section */}
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              width: '45%',
              transition: 'transform 0.3s ease-in-out',
              backgroundColor: 'white',
              margin: '0 auto'
          }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center', color: '#2c5282' }}>Auction Countdown</h1>
              <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center', color: '#2b6cb0' }}>Time Left</h2>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {Object.entries(timeLeft).map(([unit, value]) => (
                          <div key={unit} style={{ textAlign: 'center', margin: '0 8px' }}>
                              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{value.toString().padStart(2, '0')}</p>
                              <p style={{ color: '#4a5568' }}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Current Bid Section */}
              <div style={{
                  backgroundColor: '#f9fafb',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderRadius: '0.5rem',
                  padding: '16px',
                  marginBottom: '24px'
              }}>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px', color: '#2b6cb0' }}>Current Bid</h2>
                  <p style={{ fontSize: '1.25rem', color: '#4a5568' }}>${currentBid}</p>
              </div>

              {/* Place Bid Section */}
              <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px', color: '#2b6cb0' }}>Place Your Bid</h2>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <input
                          type="number"
                          value={bidAmount}
                          onChange={handleBidChange}
                          style={{
                              padding: '8px',
                              border: '1px solid #d2d6dc',
                              borderRadius: '0.5rem',
                              marginRight: '8px',
                              width: '100px'
                          }}
                      />
                      <button
                          onClick={handlePlaceBid}
                          style={{
                              backgroundColor: '#3182ce',
                              color: 'white',
                              padding: '8px 16px',
                              border: 'none',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s, transform 0.3s'
                          }}
                          onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = '#2b6cb0';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = '#3182ce';
                              e.currentTarget.style.transform = 'translateY(0)';
                          }}
                      >
                          Place Bid
                      </button>
                  </div>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#718096', textAlign: 'center' }}>*Terms and conditions apply</p>
          </div>
      </div>

        {/* Leaderboard Section */}
        <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
      width: '45%',
      transition: 'transform 0.3s ease-in-out',
      backgroundColor: 'white',
      margin: '0 auto',
      cursor: 'pointer',
    }}
      onClick={toggleExpand}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center', color: '#2c5282' }}>Leaderboard</h1>

      <div style={{ overflowX: 'auto', transition: 'max-height 0.3s ease-in-out' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '16px', borderBottom: '2px solid #cbd5e0', color: '#2b6cb0' }}>Sl No</th>
              <th style={{ padding: '16px', borderBottom: '2px solid #cbd5e0', color: '#2b6cb0' }}>User Name</th>
              <th style={{ padding: '16px', borderBottom: '2px solid #cbd5e0', color: '#2b6cb0' }}>Bid Price</th>
              <th style={{ padding: '16px', borderBottom: '2px solid #cbd5e0', color: '#2b6cb0' }}>Timing</th>
            </tr>
          </thead>
          <tbody>
            {auctionHistory.slice(0, isExpanded ? auctionHistory.length : 3).map((historyItem, index) => (
              <tr key={index}>
                <td style={{ padding: '16px', borderBottom: '1px solid #cbd5e0' }}>{index + 1}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid #cbd5e0' }}>{historyItem.user.username}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid #cbd5e0' }}>${historyItem.bidAmount}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid #cbd5e0' }}>{formatDateTime(historyItem.bidTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {auctionHistory.length > 3 && (
        <div onClick={toggleExpand} style={{
          textAlign: 'center',
          marginTop: '16px',
          color: '#2b6cb0',
          cursor: 'pointer',
        }}>
          {isExpanded ? 'Show Less' : 'Show More'} <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>▼</span>
        </div>
      )}
    </div>

      <style>
          {`
          @keyframes fadeInUp {
              0% {
                  opacity: 0;
                  transform: translateY(20px);
              }
              100% {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          `}
      </style>
  </div>
);
};
