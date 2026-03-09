
import React,{useState,useEffect} from "react";
import {addPassword,getPasswords,deletePassword} from "../api";

export default function Dashboard(){

 const[website,setWebsite]=useState("");
 const[username,setUsername]=useState("");
 const[password,setPassword]=useState("");
 const[list,setList]=useState([]);
 const[search,setSearch]=useState("");
 const[show,setShow]=useState({});

 const userId=localStorage.getItem("userId");

 const load=async()=>{
  const res=await getPasswords(userId);
  setList(res.data);
 }

 useEffect(()=>{load()},[])

 const add=async()=>{
  await addPassword({
   website,username,password,
   user:{id:userId}
  });
  setWebsite("");setUsername("");setPassword("");
  load();
 }

 const del=async(id)=>{
  await deletePassword(id);
  load();
 }

 const toggle=(id)=>{
  setShow({...show,[id]:!show[id]})
 }

 const copy=(text)=>{
  navigator.clipboard.writeText(text);
  alert("Password copied");
 }

 const filtered=list.filter(p=>p.website.toLowerCase().includes(search.toLowerCase()))

 return(
 <div className="container">

 <div className="card">
  <h2>Password Vault</h2>
  <input placeholder="Search website" onChange={e=>setSearch(e.target.value)}/>
 </div>

 <div className="card">
  <h3>Add Password</h3>
  <input placeholder="Website" value={website} onChange={e=>setWebsite(e.target.value)}/>
  <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
  <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
  <button className="primary" onClick={add}>Save</button>
 </div>

 <div className="card">
  <h3>Saved Passwords</h3>
  <table>
   <thead>
    <tr>
     <th>Website</th>
     <th>Username</th>
     <th>Password</th>
     <th>Actions</th>
    </tr>
   </thead>
   <tbody>
    {filtered.map(p=>(
     <tr key={p.entryId}>
      <td>{p.website}</td>
      <td>{p.username}</td>
      <td>
       {show[p.entryId]?p.password:"••••••••"}
       <button onClick={()=>toggle(p.entryId)}>👁</button>
      </td>
      <td>
       <button onClick={()=>copy(p.password)}>Copy</button>
       <button className="danger" onClick={()=>del(p.entryId)}>Delete</button>
      </td>
     </tr>
    ))}
   </tbody>
  </table>
 </div>

 </div>
 )
}
