import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const PricingCard = ({ 
    title, 
    price, 
    period, 
    description, 
    features, 
    buttonText, 
    buttonAction, 
    isPopular = false,
    isEnterprise = false 
  }) => (
    <div className={`relative bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border transition-all duration-300 hover:scale-105 hover:bg-opacity-15 ${
      isPopular ? 'border-orange-400 border-2' : 'border-white border-opacity-20'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          {period && <span className="text-white text-opacity-60 ml-2">{period}</span>}
        </div>
        <p className="text-white text-opacity-80">{description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-orange-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white text-opacity-90">{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={buttonAction}
        className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
          isPopular 
            ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-400' 
            : isEnterprise
            ? 'bg-white bg-opacity-10 text-white border border-white border-opacity-30 hover:bg-opacity-20'
            : 'bg-white bg-opacity-10 text-white border border-white border-opacity-30 hover:bg-opacity-20'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-mountain-gradient relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-4">
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
              className="text-white hover:text-opacity-80 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="text-white text-opacity-100 font-medium"
            >
              Pricing
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
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
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Simple, <span className="text-orange-200">Transparent</span> Pricing
            </h1>
            <p className="text-xl md:text-2xl text-white text-opacity-80 max-w-3xl mx-auto leading-relaxed mb-8">
              Choose the plan that fits your learning needs. Start free, upgrade when ready.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-white text-opacity-60'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-orange-500' : 'bg-white bg-opacity-30'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isAnnual ? 'text-white' : 'text-white text-opacity-60'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  Save 20%
                </span>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <PricingCard
              title="Free"
              price="$0"
              period="forever"
              description="Perfect for trying out KnowItGPT"
              features={[
                "5 questions per day",
                "Basic explanations",
                "Simple analogies",
                "Mobile & desktop access",
                "Community support"
              ]}
              buttonText="Get Started Free"
              buttonAction={() => navigate('/chat')}
            />

            {/* Pro Plan */}
            <PricingCard
              title="Pro"
              price={isAnnual ? "$16" : "$20"}
              period={isAnnual ? "/month" : "/month"}
              description="Unlimited access for serious learners"
              features={[
                "Unlimited questions",
                "Advanced explanations",
                "Complex analogies",
                "Priority response time",
                "Email support",
                "Export conversations",
                "Custom topics"
              ]}
              buttonText="Upgrade to Pro"
              buttonAction={() => navigate('/chat')}
              isPopular={true}
            />

            {/* Enterprise Plan */}
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For teams and organizations"
              features={[
                "Everything in Pro",
                "Team management",
                "Custom integrations",
                "Advanced analytics",
                "Dedicated support",
                "Custom training",
                "SLA guarantees"
              ]}
              buttonText="Contact Sales"
              buttonAction={() => window.open('mailto:sales@knowitgpt.com', '_blank')}
              isEnterprise={true}
            />
          </div>

          {/* Features Comparison */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white border-opacity-20">
                    <th className="pb-4 text-white font-semibold">Feature</th>
                    <th className="pb-4 text-center text-white font-semibold">Free</th>
                    <th className="pb-4 text-center text-white font-semibold">Pro</th>
                    <th className="pb-4 text-center text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-white text-opacity-80">
                  <tr className="border-b border-white border-opacity-10">
                    <td className="py-4">Daily Questions</td>
                    <td className="py-4 text-center">5</td>
                    <td className="py-4 text-center">Unlimited</td>
                    <td className="py-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-white border-opacity-10">
                    <td className="py-4">Response Time</td>
                    <td className="py-4 text-center">Standard</td>
                    <td className="py-4 text-center">Priority</td>
                    <td className="py-4 text-center">Instant</td>
                  </tr>
                  <tr className="border-b border-white border-opacity-10">
                    <td className="py-4">Explanation Depth</td>
                    <td className="py-4 text-center">Basic</td>
                    <td className="py-4 text-center">Advanced</td>
                    <td className="py-4 text-center">Expert</td>
                  </tr>
                  <tr className="border-b border-white border-opacity-10">
                    <td className="py-4">Export Conversations</td>
                    <td className="py-4 text-center">✕</td>
                    <td className="py-4 text-center">✓</td>
                    <td className="py-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-white border-opacity-10">
                    <td className="py-4">Team Management</td>
                    <td className="py-4 text-center">✕</td>
                    <td className="py-4 text-center">✕</td>
                    <td className="py-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4">Support Level</td>
                    <td className="py-4 text-center">Community</td>
                    <td className="py-4 text-center">Email</td>
                    <td className="py-4 text-center">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <h3 className="text-xl font-semibold text-white mb-4">Can I upgrade or downgrade anytime?</h3>
                <p className="text-white text-opacity-80">
                  Yes! You can upgrade to Pro or downgrade to Free at any time. Changes take effect immediately, 
                  and you'll be charged or credited accordingly.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <h3 className="text-xl font-semibold text-white mb-4">What happens if I exceed the free limit?</h3>
                <p className="text-white text-opacity-80">
                  After 5 questions, you'll be prompted to upgrade to Pro for unlimited access. 
                  Your free questions reset every 24 hours.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <h3 className="text-xl font-semibold text-white mb-4">Is there a money-back guarantee?</h3>
                <p className="text-white text-opacity-80">
                  Yes! We offer a 30-day money-back guarantee on all paid plans. 
                  If you're not satisfied, we'll refund your payment in full.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <h3 className="text-xl font-semibold text-white mb-4">How does Enterprise pricing work?</h3>
                <p className="text-white text-opacity-80">
                  Enterprise pricing is based on your team size and usage requirements. 
                  Contact our sales team for a custom quote tailored to your needs.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white text-opacity-80 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who've discovered faster, clearer explanations with KnowItGPT.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => navigate('/chat')}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </button>
            </div>
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
    </div>
  );
};

export default PricingPage; 