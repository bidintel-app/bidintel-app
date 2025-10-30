import React from 'react';
import './PricingPage.css';

const PricingPage = () => {
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

  return (
    <div className="pricing-container">
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

            <button className="subscribe-btn">
              {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
