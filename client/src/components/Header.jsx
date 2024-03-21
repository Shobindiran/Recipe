import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [cookies,setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const logout = ()=>{
    setCookies("access_token","");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }

  return (
    <div className='header'>
        <div className="container">
          <div className="header-wrapper">
            <Link to="/">Home</Link>
            <Link to="/create-recipies">Create Recipies</Link>
            {!cookies.access_token? (<Link to="/auth">Login/Register</Link>) : (
            <>
              <Link to="/saved-recipies">Saved Recipies</Link>
              <button onClick={logout}>Logout</button>
            </>
            ) }
            
          </div>
        </div>
    </div>
  );
};

export default Header;