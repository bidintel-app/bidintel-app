import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const userPlan = {
    name: 'FREE',
    price: 0,
    opportunities: 100,
    primeMatches: 5,
    usedOpportunities: 42,
    usedPrimeMatches: 2
  };

  // FIXED: Add button functionality
  const handleUpgrade = () => {
    alert('Redirecting to upgrade plans...');
    // In real app: window.location.href = '/pricing';
  };

  const handleFindOpportunities = () => {
    alert('Opening opportunity finder...');
    // In real app: window.location.href = '/opportunities';
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

        {/* FIXED: Button now works */}
        <button className="upgrade-button" onClick={handleUpgrade}>
          Upgrade Plan
        </button>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {/* FIXED: Button now works */}
          <div className="action-card" onClick={handleFindOpportunities}>
            <h3>Find Opportunities</h3>
            <p>Discover new government contracts</p>
          </div>
          
          {/* Add more action cards as needed */}
          <div className="action-card" onClick={() => alert('AI Prime Matching coming soon!')}>
            <h3>AI Prime Matching</h3>
            <p>Find prime contractors</p>
          </div>
          
          <div className="action-card" onClick={() => alert('CRM & Contacts coming soon!')}>
            <h3>CRM & Contacts</h3>
            <p>Manage your relationships</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
