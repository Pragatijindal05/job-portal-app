import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddJob() {
  const [formData, setFormData] = useState({ 
    title: '', 
    company: '', 
    location: '', 
    type: 'Full-time' 
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Job Posted Successfully!");
        navigate('/'); // Post karne ke baad wapas dashboard par bhej denge
      } else {
        alert("Failed to post job");
      }
    } catch (err) {
      console.error("Error posting job:", err);
      alert("Error occurred!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Post a New Job</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
            <input className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" 
                   placeholder="e.g. Frontend Developer" 
                   onChange={(e) => setFormData({...formData, title: e.target.value})} 
                   required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
            <input className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" 
                   placeholder="e.g. Google" 
                   onChange={(e) => setFormData({...formData, company: e.target.value})} 
                   required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
            <input className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" 
                   placeholder="e.g. Remote / Pune" 
                   onChange={(e) => setFormData({...formData, location: e.target.value})} 
                   required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Type</label>
            <select className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" 
                    onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <button type="submit" 
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}