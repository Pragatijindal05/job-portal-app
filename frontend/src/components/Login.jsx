import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // 2. Hook initialize
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await res.json();
    
    if (data.user) {
  login(data.user); 
  alert("Logged in successfully!");
  navigate('/'); // '/dashboard' ki jagah '/' try karo, kyunki aapka main page wahi hai
} else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="w-full p-2 border mb-2" type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
      <input className="w-full p-2 border mb-2" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
      <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
    </form>
  );
}