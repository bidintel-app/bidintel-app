import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OpportunitiesPage.css';

const OpportunitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample opportunities data
  const opportunities = [
    {
      id: 1,
      title: 'IT Services Contract',
      agency: 'Department of Defense',
      value: '$2.5M',
      dueDate: '30 days',
      description: 'IT infrastructure modernization and support services for defense systems.'
    },
    {
      id: 2,
      title: 'Construction Project',
      agency: 'General Services Administration',
      value: '$5.8M',
      dueDate: '45 days',
      description: 'Federal building renovation and construction project.'
    },
    {
      id: 3,
      title: 'Cybersecurity Services',
      agency: 'Department of Homeland Security',
      value: '$3.2M',
      dueDate: '21 days',
      description: 'Cybersecurity assessment and protection services for critical infrastructure.'
    }
  ];

  // FIXED: Search functionality
  const handleSearch = () => {
    if (searchTerm.trim()) {
      alert(`Searching for: "${searchTerm}"\nAdvanced search functionality coming soon!`);
    } else {
      alert('Please enter a search term');
    }
  };

  // FIXED: View Details functionality
  const handleViewDetails = (opportunity) => {
    alert(
      `Opportunity Details:\n\n` +
      `Title: ${opportunity.title}\n` +
      `Agency: ${opportunity.agency}\n` +
      `Value: ${opportunity.value}\n` +
      `Due Date: ${opportunity.dueDate}\n` +
      `Description: ${opportunity.description}\n\n` +
      `Full bid package and application portal coming soon!`
    );
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="opportunities-container">
      {/* FIXED: Added back button */}
      <button 
        onClick={handleBackToDashboard}
        className="back-button"
        style={{
          background: 'transparent',
          border: '1px solid #4299e1',
          color: '#4299e1',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back to Dashboard
      </button>

      <div className="opportunities-header">
        <h1>Find Opportunities</h1>
        <p>Discover new government contracts matching your business</p>
      </div>

      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search opportunities..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        {/* FIXED: Search button now works */}
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="opportunities-list">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="opportunity-card">
            <h3>{opportunity.title}</h3>
            <p><strong>Agency:</strong> {opportunity.agency}</p>
            <p><strong>Value:</strong> {opportunity.value}</p>
            <p><strong>Due Date:</strong> {opportunity.dueDate}</p>
            {/* FIXED: View Details button now works */}
            <button 
              className="view-details-btn"
              onClick={() => handleViewDetails(opportunity)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesPage;
