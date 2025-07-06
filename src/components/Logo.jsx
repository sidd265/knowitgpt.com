import React from 'react';

const Logo = ({ size = 'md', className = '', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img 
          src="/knowitgpt-logo.png" 
          alt="KnowItGPT - Brain Logo" 
          className="w-full h-full object-contain filter brightness-0 invert"
          onError={(e) => {
            // Fallback to text logo if image doesn't load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback logo */}
        <div 
          className="w-full h-full bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm" 
          style={{ display: 'none' }}
        >
          <span className="text-white font-bold text-lg">K</span>
        </div>
      </div>
      {showText && (
        <span className={`text-white font-semibold ${textSizeClasses[size]}`}>
          KnowItGPT
        </span>
      )}
    </div>
  );
};

export default Logo; 