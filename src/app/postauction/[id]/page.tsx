"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AuctionResultPage: React.FC = ({ params }: any) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isTopBidder, setIsTopBidder] = useState<boolean | null>(null);
  const al=params.id
  useEffect(() => {
    const fetchBidStatus = async () => {
      if (session?.user?.username) {
        try {
            const res = await fetch(`/api/postauction/${(params as any).id}}`); 
            const data = await res.json();
            
          const topBidder = data;
            console.log(topBidder);
            console.log(" user ",session.user.username);
          if (topBidder == session.user.username) {
            setIsTopBidder(true);
          } else {
            setIsTopBidder(false);
          }
        } catch (error) {
          console.error('Error fetching auction result:', error);
          setIsTopBidder(false);
        }
      }
    };

    fetchBidStatus();
  }, [session]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleMakePayment = () => {
    // Handle payment logic
  };

  if (isTopBidder === null) {
    return <div>Loading...</div>;
  }

  return isTopBidder ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '600px',
          height: '200px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1001,
          overflow: 'hidden',
        }}
      >
        <h1 style={{ fontSize: '24px', margin: 0, paddingTop: 20, color: '#4caf50' }}>
          Congratulations!!!
        </h1>
        <p style={{ margin: '10px 0 20px', padding: 0, color: '#333' }}>
            <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>
            {session?.user.username}
            </span>
            , you are the "winning bidder"
        </p>

        <Link href={`/payment/${al}`}>
      <button
        style={{
          backgroundColor: '#3182ce',
          color: 'white',
          fontWeight: '700',
          padding: '10px 20px',
          borderRadius: '5px',
          width: '180px',
          height: '40px',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          transition: 'background-color 0.2s, transform 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#2b6cb0';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#3182ce';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Make Payment
      </button>
    </Link>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: -1 }}>
          {[...Array(15)].map((_, i) => {
            const animationDuration = `${1 + Math.random() * 10}s`;
            const animationDelay = `${Math.random() * 2.5}s`;
            const left = `${Math.random() * 100}%`;
            return (
              <img
                key={i}
                src="https://st.depositphotos.com/1636803/3940/i/450/depositphotos_39403885-stock-illustration-golden-star.jpg"
                alt="star"
                style={{
                  position: 'absolute',
                  width: '15px',
                  height: '15px',
                  animation: `moveStar ${animationDuration} linear infinite`,
                  animationDelay,
                  left,
                }}
              />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes moveStar {
          0% {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
          }
          100% {
            transform: translateY(80vh) translateX(-50%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'grey',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          width: '450px',
          height: '250px',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#4caf50' }}>Bid Over!!!</h1>
        <p style={{ marginBottom: '30px' }}>The bidding period has ended. Thank you for your participation!</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AuctionResultPage;
