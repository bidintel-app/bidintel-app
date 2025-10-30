import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PricingPage from './components/PricingPage';
import OpportunitiesPage from './components/OpportunitiesPage';
import AIPrimeMatching from './components/AIPrimeMatching';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/ai-matching" element={<AIPrimeMatching />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
