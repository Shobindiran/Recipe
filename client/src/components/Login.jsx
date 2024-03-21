import React, { useState } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [_,setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const login = async (e)=>{
    e.preventDefault();

    try{
      const response = await axios.post("http://localhost:8000/auth/login",{username,password});
      setCookies("access_token",response.data.token);
      window.localStorage.setItem("userID",response.data.userID);
      navigate("/");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <section className="login">
      <div className="container">
        <div className="login-wrapper">
          <h2 className='display-5 pb-2'>Login !</h2>
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username :</label>
              <input type="text" className="form-control" value={username} onChange={e=>setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="mybtn solid">Submit</button>
          </form>
        </div> 
      </div>
    </section>
  )
}

export default Login