import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../pages/Context';

export default function Login() {
 
  const { setUserId } = useContext(UserContext);
  const navigate=useNavigate();
  const[login,setlogin]=useState({email:'',password:''});
  const handlechange=async(e)=>{
    setlogin({...login,[e.target.name]:e.target.value});
  }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`,login,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(response.status===200){
        alert(response.data.message);
        // setUserId(response.data.userId);
        setUserId(response.data.user);
      // const{name,email}=response.data.user //direct data pass username print karwane ke lia
        // localStorage.setItem("userId", response.data.userId);
        // navigate('/',{state:{name,email}});
        navigate('/');
      
        
      }
    }
    catch(err){
      alert(err.response?.data?.message || "Something went wrong");
    }
  
  }
  return (
    <div className="container">
      <div className="card">
        <h2>Sign In</h2>
        <form className="form" onSubmit={handlesubmit}>
          <div className="form-group">
            <label className="label">Email or mobile number</label>
            <input
              type="text"
              name="email"
            onChange={handlechange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              onChange={handlechange}
              required
              className="input"
            />
          </div>
        
          <button type="submit" className="button">Sign In</button>
      
         
        </form>

      <Link to="/signup">
       create an account
        </Link>
        
      </div>
    </div>
  );
}
