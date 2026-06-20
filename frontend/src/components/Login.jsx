import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext); // Get login function from context
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    
    if (data.user) {
      login(data.user); // This updates global state!
      alert("Logged in successfully!");
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