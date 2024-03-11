import React,{useState} from 'react';
import axios from "axios";


const Register = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const register = async (e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:8000/auth/register",{username,password});
    }catch(err){
      console.log(err);
    }
    
  }

  return (
    <section className="register">
      <div className="container">
        <div className="register-wrapper">
          <h2 className='display-5 pb-2'>Register !</h2>
          <form onSubmit={register}>
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

export default Register
