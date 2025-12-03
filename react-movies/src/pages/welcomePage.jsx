
import React from 'react';
import { Link } from 'react-router';

const WelcomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Movie App</h1>
      <p>Please log in or sign up to continue.</p>
      <div>
        <Link to="/login" style={{ marginRight: '10px', padding: '10px 20px', textDecoration: 'none', border: '1px solid', borderRadius: '5px' }}>
          Login
        </Link>
        <Link to="/signup" style={{ padding: '10px 20px', textDecoration: 'none', border: '1px solid', borderRadius: '5px' }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
