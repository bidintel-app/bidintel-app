import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OpportunitiesPage.css';

const OpportunitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Real opportunities data
  const allOpportunities = [
    {
      id: 1,
      title: 'IT Services Contract',
      agency: 'Department of Defense',
      value: '$2.5M',
      dueDate: '30 days',
      category: 'Technology',
      description: 'IT infrastructure modernization and support services for defense systems.'
    },
    {
      id: 2,
      title: 'Federal Building Construction',
      agency: 'General Services Administration',
      value: '$5.8M',
      dueDate: '45 days',
      category: 'Construction',
      description: 'Federal building renovation and construction project.'
    },
    {
      id: 3,
      title: 'Cybersecurity Assessment',
      agency: 'Department of Homeland Security',
      value: '$3.2M',
      dueDate: '21 days',
      category: 'Technology',
      description: 'Cybersecurity assessment and protection services for critical infrastructure.'
    },
    {
      id: 4,
      title: 'Healthcare IT System',
      agency: 'Department of Veterans Affairs',
      value: '$4.1M',
      dueDate: '60 days',
      category: 'Healthcare',
      description: 'Electronic health records system implementation and support.'
    }
  ];

  // REAL search functionality
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      const filtered = allOpportunities.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOpportunities(filtered);
    } else {
      setIsSearching(false);
      setFilteredOpportunities([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setFilteredOpportunities([]);
  };

  const displayOpportunities = isSearching ? filteredOpportunities : allOpportunities;

  return (
    <div className="opportunities-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Dashboard
      </button>

      <div className="opportunities-header">
        <h1>Find Opportunities</h1>
        <p>Discover new government contracts matching your business</p>
      </div>

      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search by title, agency, or category..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        {isSearching && (
          <button className="clear-btn" onClick={clearSearch}>
            Clear
          </button>
        )}
      </div>

      {isSearching && (
        <div className="search-results-info">
          Found {filteredOpportunities.length} opportunity(s) for "{searchTerm}"
        </div>
      )}

      <div className="opportunities-list">
        {displayOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="opportunity-card">
            <h3>{opportunity.title}</h3>
            <p><strong>Agency:</strong> {opportunity.agency}</p>
            <p><strong>Value:</strong> {opportunity.value}</p>
            <p><strong>Due Date:</strong> {opportunity.dueDate}</p>
            <p><strong>Category:</strong> {opportunity.category}</p>
            <button className="view-details-btn">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesPage;
