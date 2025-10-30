import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './PricingPage.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PricingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Real Stripe price IDs (you'll get these from Stripe dashboard)
  const plans = [
    {
      id: 'free',
      name: 'FREE',
      price: 0,
      stripePriceId: null, // Free plan doesn't need Stripe
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
      stripePriceId: 'price_premium_monthly', // Your actual Stripe price ID
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
      stripePriceId: 'price_enterprise_monthly', // Your actual Stripe price ID
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
      // Free plan - just redirect to signup
      navigate('/signup?plan=free');
      return;
    }

    setLoading(true);
    
    try {
      const stripe = await stripePromise;
      
      // Call your backend to create checkout session
      const response = await fetch('/api/payments/create-checkout-session', {
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
              className={`subscribe-btn ${loading ? 'loading' : ''}`}
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
