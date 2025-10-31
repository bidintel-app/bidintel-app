import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const userPlan = {
    name: 'FREE',
    price: 0,
    opportunities: 100,
    primeMatches: 5,
    usedOpportunities: 42,
    usedPrimeMatches: 2
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const handleFindOpportunities = () => {
    navigate('/opportunities');
  };

  // CHANGED: Now navigates to real AI Matching page
  const handleAIPrimeMatching = () => {
    navigate('/ai-matching');
  };

  const handleCRMContacts = () => {
    alert('CRM & Contacts feature coming soon!');
  };

  const displayPrice = (price) => {
    const numericPrice = Number(price);
    if (numericPrice === 0) return 'FREE';
    if (isNaN(numericPrice)) return 'FREE';
    return `$${numericPrice}/month`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to BidIntel</h1>
        <p>Your AI-powered government contracting partner</p>
      </div>

      <div className="plan-overview">
        <div className="current-plan">
          <span className="plan-badge">{userPlan.name}</span>
          <div className="plan-price">{displayPrice(userPlan.price)}</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{userPlan.opportunities}</div>
            <div className="stat-label">Opportunities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{userPlan.primeMatches}</div>
            <div className="stat-label">Prime Matches</div>
          </div>
        </div>

        <button className="upgrade-button" onClick={handleUpgrade}>
          Upgrade Plan
        </button>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card" onClick={handleFindOpportunities}>
            <h3>Find Opportunities</h3>
            <p>Discover new government contracts</p>
          </div>
          
          {/* CHANGED: Now goes to real AI Matching page */}
          <div className="action-card" onClick={handleAIPrimeMatching}>
            <h3>AI Prime Matching</h3>
            <p>Find prime contractors</p>
          </div>
          
          <div className="action-card" onClick={handleCRMContacts}>
            <h3>CRM & Contacts</h3>
            <p>Manage your relationships</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// Add this import at the top
import BusinessProfile from './BusinessProfile';

// Then in your return statement, add the BusinessProfile component:
return (
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h1>Welcome to BidIntel</h1>
      <p>Your AI-powered government contracting partner</p>
    </div>

    {/* ADD THIS NEW SECTION */}
    <BusinessProfile />

    <div className="plan-overview">
      {/* ... rest of your existing dashboard code ... */}
    </div>

    <div className="quick-actions">
      {/* ... rest of your existing dashboard code ... */}
    </div>
  </div>
);
