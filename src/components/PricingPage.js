import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './PricingPage.css';

// YOUR ACTUAL PUBLISHABLE KEY
const stripePromise = loadStripe('pk_test_51SNLGxPCIRVSkbgXmz2sSMbMoHt7rxvEZ5FIGkSmj0Bn7y1fLHJg6jXVUX2XdACTht0qGQpk0NC65x07WkZJxT5r003qIQg1rS');

const PricingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // YOUR ACTUAL STRIPE PRICE IDs
  const plans = [
    {
      id: 'free',
      name: 'FREE',
      price: 0,
      stripePriceId: null,
      description: 'For teams getting started',
      features: [
        '100 Opportunities per month',
        '5 Prime Matches',
        '10 CRM Contacts', 
        'Basic search filters',
        '30-day history'
      ]
    },
    {
      id: 'premium', 
      name: 'PREMIUM',
      price: 49,
      stripePriceId: 'price_1SNLfYPCIRVSkbgXIOsNQQud', // YOUR 1ST PRICE ID
      description: 'For growing teams',
      features: [
        'Unlimited Opportunities',
        '50 Prime Matches/month',
        '500 CRM Contacts',
        'Advanced search & filters',
        'Email alerts',
        '1-year history',
        'Priority support'
      ]
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE', 
      price: 149,
      stripePriceId: 'price_1SNLgaPCIRVSkbgX8Td18e6H', // YOUR 2ND PRICE ID
      description: 'For scaling businesses',
      features: [
        'Everything in Premium',
        'Unlimited Prime Matches', 
        'Unlimited CRM Contacts',
        'API access',
        'Custom reporting',
        'Dedicated account manager',
        'Phone support'
      ]
    }
  ];

  const handleSubscribe = async (plan) => {
    if (plan.price === 0) {
      // Free plan - redirect to dashboard
      navigate('/');
      return;
    }

    setLoading(true);
    
    try {
      const stripe = await stripePromise;
      
      // Call your backend to create checkout session
      const response = await fetch('http://localhost:5000/api/payments/create-checkout-session', {
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

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
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
              className={`subscribe-btn ${plan.id === 'premium' ? 'popular' : ''} ${loading ? 'loading' : ''}`}
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
