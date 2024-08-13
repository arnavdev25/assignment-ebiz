import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <Link to="/update-profile">
        <button>Update Profile</button>
      </Link>
      <Link to="/reset-password">
        <button>Reset Password</button>
      </Link>
    </div>
  );
};

export default Home;
