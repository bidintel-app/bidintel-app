import React from 'react';
import './OpportunitiesPage.css';

const OpportunitiesPage = () => {
  return (
    <div className="opportunities-container">
      <div className="opportunities-header">
        <h1>Find Opportunities</h1>
        <p>Discover new government contracts matching your business</p>
      </div>

      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search opportunities..." 
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </div>

      <div className="opportunities-list">
        <div className="opportunity-card">
          <h3>IT Services Contract</h3>
          <p>Agency: Department of Defense</p>
          <p>Value: $2.5M</p>
          <p>Due Date: 30 days</p>
          <button className="view-details-btn">View Details</button>
        </div>

        <div className="opportunity-card">
          <h3>Construction Project</h3>
          <p>Agency: General Services Administration</p>
          <p>Value: $5.8M</p>
          <p>Due Date: 45 days</p>
          <button className="view-details-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
