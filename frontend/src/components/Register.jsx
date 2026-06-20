import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) alert("Registered successfully! Please login.");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="w-full p-2 border mb-2" type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input className="w-full p-2 border mb-2" type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
      <input className="w-full p-2 border mb-2" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
      <select className="w-full p-2 border mb-4" onChange={e => setFormData({...formData, role: e.target.value})}>
        <option value="user">Job Seeker</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button className="w-full bg-indigo-600 text-white py-2 rounded">Sign Up</button>
    </form>
  );
}