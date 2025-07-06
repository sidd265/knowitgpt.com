import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  const [showVideoBackground, setShowVideoBackground] = useState(true); // Toggle for video background

  // Performance data for charts
  const performanceData = [
    { model: 'KnowItGPT', responseTime: 0.8, accuracy: 95 },
    { model: 'GPT-4', responseTime: 2.4, accuracy: 92 },
    { model: 'Claude', responseTime: 1.9, accuracy: 90 },
    { model: 'Bard', responseTime: 1.6, accuracy: 88 },
    { model: 'Llama 2', responseTime: 3.2, accuracy: 85 }
  ];

  const PerformanceChart = ({ data, metric, unit, title }) => {
    const maxValue = Math.max(...data.map(d => d[metric]));
    
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
        <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-white font-medium w-24">{item.model}</span>
              <div className="flex-1 mx-4">
                <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.model === 'KnowItGPT' ? 'bg-orange-400' : 'bg-gray-400'
                    }`}
                    style={{ 
                      width: `${(item[metric] / maxValue) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
              </div>
              <span className="text-white font-bold w-16 text-right">
                {item[metric]}{unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
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
            <source src="/about-video.mp4" type="video/mp4" />
          </video>
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}
      
      {/* Fallback dark overlay for gradient background */}
      {!showVideoBackground && (
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
      )}
      {/* Navigation Header */}
      <nav className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-white font-semibold text-xl">KnowItGPT</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')}
              className="text-white hover:text-opacity-80 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-white text-opacity-100 font-medium"
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

      {/* Main Content */}
      <div className="relative z-20 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Built for <span className="text-orange-200">Speed</span>
            </h1>
            <p className="text-xl md:text-2xl text-white text-opacity-80 max-w-3xl mx-auto leading-relaxed">
              KnowItGPT delivers lightning-fast explanations without compromising accuracy. 
              See how we outperform other leading AI models.
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <PerformanceChart 
              data={performanceData.sort((a, b) => a.responseTime - b.responseTime)}
              metric="responseTime"
              unit="s"
              title="Response Time Comparison"
            />
            <PerformanceChart 
              data={performanceData.sort((a, b) => b.accuracy - a.accuracy)}
              metric="accuracy"
              unit="%"
              title="Accuracy Comparison"
            />
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-white text-opacity-80">
                3x faster response times than GPT-4, with average responses in under 1 second.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Highly Accurate</h3>
              <p className="text-white text-opacity-80">
                95% accuracy rate in explaining complex topics with simple analogies.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Specialized Training</h3>
              <p className="text-white text-opacity-80">
                Trained specifically on educational content and real-world analogies.
              </p>
            </div>
          </div>

          {/* Technology Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Technology</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Optimized Architecture</h3>
                  <p className="text-white text-opacity-80 mb-6">
                    Our model uses a streamlined architecture specifically designed for educational explanations. 
                    By focusing on analogy generation and simplification, we achieve faster processing without 
                    sacrificing quality.
                  </p>
                  <ul className="space-y-3 text-white text-opacity-80">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                      Reduced parameter complexity for faster inference
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                      Specialized training on educational datasets
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                      Optimized for analogy and simplification tasks
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="bg-white bg-opacity-5 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-white text-opacity-80">Avg. Response Time</span>
                        <span className="text-orange-400 font-bold">0.8s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white text-opacity-80">Accuracy Rate</span>
                        <span className="text-orange-400 font-bold">95%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white text-opacity-80">User Satisfaction</span>
                        <span className="text-orange-400 font-bold">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white text-opacity-80">Uptime</span>
                        <span className="text-orange-400 font-bold">99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience the Speed?</h2>
            <p className="text-xl text-white text-opacity-80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who've discovered faster, clearer explanations with KnowItGPT.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => navigate('/chat')}
                className="btn-primary text-lg px-8 py-4"
              >
                Try KnowItGPT Free
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                className="btn-secondary text-lg px-8 py-4"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 