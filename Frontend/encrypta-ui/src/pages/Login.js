
import React,{useState} from "react";
import {loginUser} from "../api";
import {useNavigate,Link} from "react-router-dom";

export default function Login(){

 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");
 const navigate=useNavigate();

 const login=async()=>{
  try{
   await loginUser({email,password});
   localStorage.setItem("userId",1);
   navigate("/dashboard");
  }catch{
   alert("Login failed");
  }
 }

 return(
 <div className="container">
  <div className="card">
   <h2>Login</h2>
   <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
   <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
   <br/>
   <button className="primary" onClick={login}>Login</button>
   <p>New user? <Link to="/register">Register</Link></p>
  </div>
 </div>
 )
}
