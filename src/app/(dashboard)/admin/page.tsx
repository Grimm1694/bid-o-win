"use client"
import React from 'react';

const Website: React.FC = () => {
    return (
        <div className="relative font-sans leading-normal tracking-normal">
            {/* Background Image */}
            <div
                className="absolute top-0 left-0 w-[400px] h-[200px] bg-cover bg-center z-0"
                style={{ backgroundImage: 'url("https://curlytales.com/wp-content/uploads/2019/08/Untitled-design-2019-08-21T135235.090.png")' }}
            />
            
            {/* Main Content */}
            <main className="bor z-10 p-8 bg-[#E1EEC3] rounded-lg shadow-lg mt-80 md:mt-64">
                {/* About Our Website Section */}
                <section className="mb-12 pb-8 border-b border-gray-300">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">About Our Website</h2>
                    <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-8">
                        <img src="https://media.licdn.com/dms/image/C4D12AQEGqgj3tYmcfw/article-cover_image-shrink_720_1280/0/1641982037953?e=2147483647&v=beta&t=GbO3yNuc8LfFcgSwd4gsbV8OaOw7m5C3JD6m0pP5TTI" alt="About Us" className="rounded-lg shadow-lg mb-4 md:mb-0" style={{ maxWidth: '400px' }} />
                        <div>
                            <p className="text-gray-700 mb-4">Welcome to Bid-o-win, the premier destination for online auctions! Whether you're a seller looking to reach a wider audience or a buyer searching for unique items, our platform is designed to make the auction experience seamless and enjoyable.</p>
                            <p className="text-gray-700">We prioritize user experience, trust, and security, ensuring a safe and supportive environment for all our users. Join us at Bid-o-win and experience the excitement of online auctions today!</p>
                        </div>
                    </div>
                </section>

                {/* Space Between Sections */}
                <div className="mb-8" />

                {/* Information About Bidding Section */}
                <section className="mb-12 pb-8 border-b border-gray-300">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Information About Bidding</h2>
                    <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8">
                        <img src="https://familyactivities.ca/images/listing/38/ea1836ee2ea140ddb9494e24f6844412-musee-des-hospitalieres-de-lhotel-dieu-de-montreal-exposition-permanente.jpg" alt="Bidding Info" className="rounded-lg shadow-lg mb-4 md:mb-0" style={{ maxWidth: '400px' }} />
                        <div>
                            <p className="text-gray-700 mb-4">Bidding on our platform is simple and straightforward. Follow these steps to place a bid:</p>
                            <ul className="list-disc list-inside text-gray-700 mb-4">
                                <li>Create an account or log in if you already have one.</li>
                                <li>Browse the available items and select the one you are interested in.</li>
                                <li>Enter your bid amount and submit your bid.</li>
                                <li>Monitor your bid status and wait for the auction to end.</li>
                                <li>If you win, you will be notified and can proceed with the payment and item collection.</li>
                            </ul>
                            <p className="text-gray-700">Remember to bid responsibly and only place bids that you are willing and able to follow through with. Happy bidding!</p>
                        </div>
                    </div>
                </section>

                {/* Our Features Section */}
                <section className="cards-container mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Our Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1: Live Auctions */}
                        <div className="bg-[#439447] p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 highlight-card" style={{ maxWidth: '300px', animation: 'fadeInUp 1s ease-in-out' }}>
                        <img src="https://helpinghand.com.au/wp-content/uploads/2022/08/Live-Auction.jpg" alt="Auction History" className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-bold text-[#E1EEC3] mb-2">Live Auctions</h3>
                            <p className="text-[#c3eec5]">Participate in live auctions and place your bids in real-time.</p>
                        </div>
                        {/* Card 2: Auction History */}
                        <div className="bg-[#439447] p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 highlight-card" style={{ maxWidth: '300px', animation: 'fadeInUp 1s ease-in-out 0.2s' }}>
                            <img src="https://cdn.corporatefinanceinstitute.com/assets/strategic-buyer-1024x683.jpeg" alt="Auction History" className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-bold text-[#E1EEC3] mb-2">Buyer</h3>
                            <p className="text-[#E1EEC3]">View your past auctions and bids in your auction history.</p>
                        </div>
                        {/* Card 3: Secure Payments */}
                        <div className="bg-[#439447] p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 highlight-card" style={{ maxWidth: '300px', animation: 'fadeInUp 1s ease-in-out 0.4s' }}>
                            <img src="https://img.indiafilings.com/learn/wp-content/uploads/2014/12/12011353/How-to-sell-on-Flipkart.jpg" alt="Secure Payments" className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-bold text-[#E1EEC3] mb-2">Seller</h3>
                            <p className="text-[#E1EEC3]">Make secure payments through our platform with ease.</p>
                        </div>
                        {/* Card 4: Customer Support */}
                        <div className="bg-[#439447] p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 highlight-card" style={{ maxWidth: '300px', animation: 'fadeInUp 1s ease-in-out 0.6s' }}>
                            <img src="https://st4.depositphotos.com/12985790/22094/i/450/depositphotos_220944824-stock-photo-selective-focus-smiling-female-call.jpg" alt="Customer Support" className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-bold text-[#E1EEC3] mb-2">Customer Support</h3>
                            <p className="text-[#E1EEC3]">Get support from our dedicated customer service team.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="page-footer absolute bottom-0 left-0 w-full bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex justify-between items-center">
                        <div className="text-gray-700">&copy; 2024 Your Website. All rights reserved.</div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-700 hover:text-gray-900">Privacy Policy</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Terms of Service</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .bg-cover {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }
                    .cards-container {
  /* Ensure cards have some margin or padding */
  margin-bottom: 100px; /* Adjust as needed */
}

.page-footer {
  background-color: #FFF8c8; /* Set background color */
  color: black; /* Set text color */
  height: 85px; /* Ensure footer has some margin or padding */
  padding-bottom: 0.1rem; /* Adjust as needed */
}

.bor {
  width: 100%;
}
              
                    .bor {
                    width: 100%;
}
                    .h-\[200px\] {
    height: 600px;
    

}
                .highlight-card:hover {
                    transform: scale(1.05);
                }
                    @media (min-width: 768px) {
    .md\:mt-64 {
        margin-top: 560px /* 256px */;
    }
}
            `}</style>
            
        </div>
    );
};

export default Website;
