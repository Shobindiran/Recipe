import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <div className="container">
          <div className="header-wrapper">
            <Link to="/">Home</Link>
            <Link to="/create-recipies">Create Recipies</Link>
            <Link to="/saved-recipies">Saved Recipies</Link>
            <Link to="/auth">SignIn/SignUp</Link>
          </div>
        </div>
    </div>
  );
};

export default Header;