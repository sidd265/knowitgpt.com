import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [showVideoBackground, setShowVideoBackground] = useState(true); // Toggle for video background
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/chat?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-mountain-gradient relative overflow-hidden">
      {/* Video Background */}
      {showVideoBackground && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/background-video.mp4" type="video/mp4" />
          </video>
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      )}
      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/about')}
              className="text-white hover:text-opacity-80 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="text-white hover:text-opacity-80 transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Video Background Toggle */}
            <button 
              onClick={() => setShowVideoBackground(!showVideoBackground)}
              className="text-white hover:text-opacity-80 transition-colors text-sm"
              title={showVideoBackground ? "Switch to gradient background" : "Switch to video background"}
            >
              {showVideoBackground ? "📹" : "🎨"}
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="hidden sm:block text-white hover:text-opacity-80 transition-colors"
            >
              Try the AI
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="btn-secondary text-sm"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart Answers.<br />
            <span className="text-white text-opacity-90">Super Simple.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white text-opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get real-world explanations for complex questions.
          </p>

          {/* Input Bar */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Talk to KnowItGPT…"
                className="input-field text-lg py-4 pr-16"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                aria-label="Submit question"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => navigate('/chat')}
              className="btn-primary text-lg px-8 py-4"
            >
              Get a demo
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="btn-secondary text-lg px-8 py-4"
            >
              Start building
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Mountain Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 300" className="w-full h-auto">
          <path
            d="M0,300 L0,200 L100,150 L200,180 L300,120 L400,160 L500,100 L600,140 L700,80 L800,120 L900,90 L1000,130 L1100,110 L1200,140 L1200,300 Z"
            fill="rgba(0,0,0,0.1)"
          />
          <path
            d="M0,300 L0,240 L150,200 L250,220 L350,180 L450,210 L550,160 L650,190 L750,150 L850,180 L950,160 L1050,190 L1150,170 L1200,180 L1200,300 Z"
            fill="rgba(0,0,0,0.05)"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white text-opacity-60 text-sm">
            © KnowItGPT · 
            <button 
              onClick={() => navigate('/about')}
              className="hover:text-opacity-80 ml-1"
            >
              About
            </button> · 
            <button 
              onClick={() => navigate('/pricing')}
              className="hover:text-opacity-80 ml-1"
            >
              Pricing
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 