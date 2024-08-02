// Hero.tsx

import React from 'react';

interface HeroProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
        <div className="bg-cover bg-center lg:w-1/2" style={{ backgroundImage: `url(${imageUrl})` }}>
          {/* Background Image */}
          <div className="h-full bg-black opacity-25"></div>
        </div>
        <div className="py-12 px-6 sm:px-10 lg:w-1/2">
          {/* Card Content */}
          <div className="lg:max-w-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
