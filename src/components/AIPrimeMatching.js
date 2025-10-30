import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AIPrimeMatching.css';

const AIPrimeMatching = () => {
  const navigate = useNavigate();
  const [businessType, setBusinessType] = useState('');
  const [capabilities, setCapabilities] = useState('');
  const [matches, setMatches] = useState([]);

  const primeContractors = [
    {
      id: 1,
      name: 'Lockheed Martin',
      specialization: 'Aerospace & Defense',
      contact: 'procurement@lockheed.com',
      projects: ['Missile Systems', 'Aircraft Maintenance', 'IT Services'],
      matchScore: 92
    },
    {
      id: 2,
      name: 'Booz Allen Hamilton',
      specialization: 'Consulting & Technology',
      contact: 'subcontract@bah.com',
      projects: ['Cybersecurity', 'Data Analytics', 'Digital Transformation'],
      matchScore: 88
    },
    {
      id: 3,
      name: 'General Dynamics',
      specialization: 'Defense & Technology',
      contact: 'teaming@gd.com',
      projects: ['IT Systems', 'Engineering Services', 'Logistics'],
      matchScore: 85
    }
  ];

  const findMatches = () => {
    // Simple matching logic - in real app, this would be AI-powered
    const foundMatches = primeContractors.map(contractor => ({
      ...contractor,
      matchScore: Math.floor(Math.random() * 30) + 70 // Random score 70-99
    })).sort((a, b) => b.matchScore - a.matchScore);

    setMatches(foundMatches);
  };

  return (
    <div className="ai-matching-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Dashboard
      </button>

      <div className="matching-header">
        <h1>AI Prime Matching</h1>
        <p>Connect with prime contractors looking for your capabilities</p>
      </div>

      <div className="matching-form">
        <div className="form-group">
          <label>Your Business Type:</label>
          <input 
            type="text" 
            placeholder="e.g., IT Services, Construction, Healthcare..."
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Your Capabilities:</label>
          <textarea 
            placeholder="Describe your company's capabilities, past projects, certifications..."
            value={capabilities}
            onChange={(e) => setCapabilities(e.target.value)}
            rows="4"
          />
        </div>

        <button className="find-matches-btn" onClick={findMatches}>
          Find Prime Matches
        </button>
      </div>

      {matches.length > 0 && (
        <div className="matches-section">
          <h2>Your Prime Contractor Matches</h2>
          <div className="matches-grid">
            {matches.map(contractor => (
              <div key={contractor.id} className="contractor-card">
                <div className="match-score">{contractor.matchScore}% Match</div>
                <h3>{contractor.name}</h3>
                <p><strong>Specialization:</strong> {contractor.specialization}</p>
                <p><strong>Contact:</strong> {contractor.contact}</p>
                <div className="projects">
                  <strong>Active Projects:</strong>
                  <ul>
                    {contractor.projects.map((project, index) => (
                      <li key={index}>{project}</li>
                    ))}
                  </ul>
                </div>
                <button className="contact-btn">
                  Contact This Prime
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPrimeMatching;
