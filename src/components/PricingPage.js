import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './PricingPage.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE);

const PricingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'FREE',
      price: 0,
      stripePriceId: null,
      description: 'Perfect for getting started',
      features: [
        '100 Opportunities per month',
        'Basic NAICS code filtering',
        'View subcontractor directory',
        '5 Prime Matches',
        '30-day opportunity history',
        'Standard search filters'
      ],
      limitations: [
        'Limited to 3 NAICS codes',
        'View-only subcontractor access'
      ]
    },
    {
      id: 'premium', 
      name: 'PREMIUM',
      price: 49,
      stripePriceId: 'price_1SNLfYPCIRVSkbgXIOsNQQud',
      description: 'For growing contracting businesses',
      features: [
        'Unlimited Opportunities',
        'Advanced NAICS + designation filters',
        'Contact subcontractors directly',
        '50 Prime Matches/month',
        '1-year opportunity history',
        'Bid matching alerts',
        'Email notifications',
        'Priority support',
        'Historical data insights'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE', 
      price: 149,
      stripePriceId: 'price_1SNLgaPCIRVSkbgX8Td18e6H',
      description: 'For established government contractors',
      features: [
        'Everything in Premium',
        'Unlimited Prime Matches',
        'API access for integration',
        'Custom reporting & analytics',
        'Dedicated account manager',
        'Phone support',
        'Training sessions',
        'Custom NAICS code setup',
        'Advanced subcontractor matching'
      ]
    }
  ];

  const handleSubscribe = async (plan) => {
    if (plan.price === 0) {
      navigate('/');
      return;
    }

    setLoading(true);
    
    try {
      const stripe = await stripePromise;
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const { sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Dashboard
      </button>

      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Scale your government contracting business with powerful tools</p>
      </div>

      <div className="pricing-plans">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
            
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

            {plan.limitations && (
              <div className="limitations">
                <strong>Limitations:</strong>
                <ul>
                  {plan.limitations.map((limit, index) => (
                    <li key={index}>• {limit}</li>
                  ))}
                </ul>
              </div>
            )}

            <button 
              className={`subscribe-btn ${plan.popular ? 'popular-btn' : ''} ${loading ? 'loading' : ''}`}
              onClick={() => handleSubscribe(plan)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 
               plan.price === 0 ? 'Get Started Free' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
