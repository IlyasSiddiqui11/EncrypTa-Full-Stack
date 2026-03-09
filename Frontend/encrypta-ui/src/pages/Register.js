
import React,{useState} from "react";
import {registerUser} from "../api";
import {useNavigate,Link} from "react-router-dom";

export default function Register(){

 const[username,setUsername]=useState("");
 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");
 const navigate=useNavigate();

 const register=async()=>{
  try{
   await registerUser({username,email,password});
   alert("Registered successfully");
   navigate("/");
  }catch{
   alert("Registration failed");
  }
 }

 return(
 <div className="container">
  <div className="card">
   <h2>Register</h2>
   <input placeholder="Username" onChange={e=>setUsername(e.target.value)}/>
   <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
   <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
   <br/>
   <button className="success" onClick={register}>Register</button>
   <p>Already have account? <Link to="/">Login</Link></p>
  </div>
 </div>
 )
}
