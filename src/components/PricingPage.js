import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingPage.css';

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'FREE',
      price: 0,
      description: 'For teams getting started',
      features: [
        '100 Opportunities',
        '5 Prime Matches/mo',
        '10 CRM Contacts',
        'Basic opportunity tracking',
        'Standard search filters'
      ]
    },
    {
      id: 'premium', 
      name: 'PREMIUM',
      price: 49,
      description: 'For growing teams',
      features: [
        'Unlimited Opportunities',
        '50 Prime Matches/mo', 
        '500 CRM Contacts',
        'Advanced tracking',
        'Priority match alerts',
        'Export capabilities'
      ]
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE', 
      price: 149,
      description: 'For scaling businesses',
      features: [
        'Unlimited Everything',
        'Dedicated account manager',
        'API access',
        'Custom reporting',
        'Phone support'
      ]
    }
  ];

  const handleSubscribe = (planId) => {
    if (planId === 'free') {
      alert('Free plan activated! Redirecting to dashboard...');
      navigate('/');
    } else {
      alert(`Starting subscription process for ${planId.toUpperCase()} plan...`);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="pricing-container">
      <button 
        onClick={handleBackToDashboard}
        className="back-button"
      >
        ← Back to Dashboard
      </button>

      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Scale your government contracting business</p>
      </div>

      <div className="pricing-plans">
        {plans.map((plan) => (
          <div key={plan.id} className="pricing-card">
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <div className="price">
                {plan.price === 0 ? 'FREE' : `$${plan.price}/month`}
              </div>
              <p>{plan.description}</p>
            </div>

            <ul className="features-list">
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>

            <button 
              className="subscribe-btn"
              onClick={() => handleSubscribe(plan.id)}
            >
              {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
