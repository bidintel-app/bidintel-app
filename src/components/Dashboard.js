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

        <button className="upgrade-button">
          Upgrade Plan
        </button>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <h3>Find Opportunities</h3>
            <p>Discover new government contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
