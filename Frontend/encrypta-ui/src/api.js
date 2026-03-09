
import axios from "axios";

const API = axios.create({
 baseURL:"http://localhost:8080/api"
});

export const registerUser=(data)=>API.post("/users/register",data);
export const loginUser=(data)=>API.post("/users/login",data);

export const addPassword=(data)=>API.post("/passwords",data);
export const getPasswords=(userId)=>API.get(`/passwords/user/${userId}`);
export const deletePassword=(id)=>API.delete(`/passwords/${id}`);
