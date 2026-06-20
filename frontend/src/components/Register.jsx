import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration Successful! Please Login.");
        navigate('/login');
      } else {
        alert("Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <input className="w-full p-3 border rounded-lg" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input className="w-full p-3 border rounded-lg" type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input className="w-full p-3 border rounded-lg" type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold">Register</button>
        </form>
      </div>
    </div>
  );
}