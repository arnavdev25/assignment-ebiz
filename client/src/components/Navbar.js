import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user && <Link to="/signup">Signup</Link>}
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/update-profile">Update Profile</Link>}
      {user && <Link to="/reset-password">Reset Password</Link>}
    </nav>
  );
};

export default Navbar;
