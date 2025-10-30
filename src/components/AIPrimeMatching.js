import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AIPrimeMatching.css';

const AIPrimeMatching = () => {
  const navigate = useNavigate();

  return (
    <div className="ai-matching-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Dashboard
      </button>

      <div className="matching-header">
        <h1>AI Prime Matching</h1>
        <p>Connect with prime contractors looking for your capabilities</p>
      </div>

      <div className="coming-soon-message">
        <h2>🚀 Advanced AI Matching Coming Soon!</h2>
        <p>We're building intelligent algorithms to match you with the perfect prime contractors.</p>
        <button onClick={() => navigate('/')} className="return-home-btn">
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AIPrimeMatching;
  
     
       
         
