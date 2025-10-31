import React, { useState } from 'react';
import './BusinessProfile.css';

const BusinessProfile = () => {
  const [profile, setProfile] = useState({
    businessName: '',
    naicsCodes: [],
    designations: [],
    lookingForSubcontracting: false
  });

  const commonNAICS = [
    { code: '541511', name: 'Custom Computer Programming Services' },
    { code: '541512', name: 'Computer Systems Design Services' },
    { code: '236220', name: 'Commercial Construction' },
    { code: '541330', name: 'Engineering Services' },
    { code: '561110', name: 'Office Administrative Services' }
  ];

  const designations = [
    'Small Business',
    'Women-Owned Small Business', 
    'Veteran-Owned Small Business',
    '8(a) Business Development',
    'HUBZone'
  ];

  return (
    <div className="business-profile">
      <h2>Business Profile</h2>
      <div className="profile-form">
        <div className="form-group">
          <label>Business Name</label>
          <input 
            type="text" 
            value={profile.businessName}
            onChange={(e) => setProfile({...profile, businessName: e.target.value})}
            placeholder="Your business name"
          />
        </div>

        <div className="form-group">
          <label>NAICS Codes</label>
          <div className="naics-selector">
            {commonNAICS.map(naics => (
              <div key={naics.code} className="naics-option">
                <input 
                  type="checkbox"
                  checked={profile.naicsCodes.includes(naics.code)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProfile({...profile, naicsCodes: [...profile.naicsCodes, naics.code]});
                    } else {
                      setProfile({...profile, naicsCodes: profile.naicsCodes.filter(code => code !== naics.code)});
                    }
                  }}
                />
                <span>{naics.code} - {naics.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Business Designations</label>
          <div className="designation-selector">
            {designations.map(designation => (
              <div key={designation} className="designation-option">
                <input 
                  type="checkbox"
                  checked={profile.designations.includes(designation)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProfile({...profile, designations: [...profile.designations, designation]});
                    } else {
                      setProfile({...profile, designations: profile.designations.filter(d => d !== designation)});
                    }
                  }}
                />
                <span>{designation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input 
              type="checkbox"
              checked={profile.lookingForSubcontracting}
              onChange={(e) => setProfile({...profile, lookingForSubcontracting: e.target.checked})}
            />
            Available for subcontracting opportunities
          </label>
        </div>

        <button className="save-profile-btn">Save Profile</button>
      </div>
    </div>
  );
};

export default BusinessProfile;
