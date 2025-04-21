import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    mobile: '1234567890',
    email: 'john@example.com',
    password: '******',
    image: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <input type="text" name="name" value={profile.name} disabled />
      <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} disabled={!editable} />
      <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editable} />
      <input type="password" name="password" value={profile.password} onChange={handleChange} disabled={!editable} />
      <input type="file" name="image" disabled={!editable} />
      <div>
        {!editable ? (
          <button onClick={() => setEditable(true)}>Edit</button>
        ) : (
          <button onClick={() => setEditable(false)}>Save</button>
        )}
      </div>
    </div>
  );
};

export default Profile;