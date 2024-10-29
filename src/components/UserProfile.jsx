import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './UserProfile.css';
import NoteContext from '../context/Notes/noteContext';

const UserProfile = () => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const location = useLocation();
  const context = useContext(NoteContext);
  const { myStyle } = context;

  const fetchLetter = (str) => {
    let acronym = str.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    return acronym;
  };

  const containerStyle = {
    color: myStyle.color === 'white' ? 'black' : 'white',
    backgroundColor: myStyle.backgroundColor === 'black' ? 'white' : 'black',
  };

  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // Track authentication status

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Fetch user data only if authenticated and on the "/" route
    if (loggedIn && location.pathname === '/') {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
          });
          const json = await response.json();
          setUserData(json);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [host, location.pathname, loggedIn]);

  if (!loggedIn || location.pathname !== '/' || !userData) {
    return null;
  }

  return (
    <div className='container user-container'>
      <div className='user-profile' style={containerStyle}>
        <div className="name-tag" style={{ color: myStyle.color === 'black' ? 'white' : 'black' }}>
          {fetchLetter(userData.name).toUpperCase()}
        </div>
      </div>
      <div className="name" style={{ color: myStyle.color }}>
        {userData.name}
      </div>
    </div>
  );
};

export default UserProfile;