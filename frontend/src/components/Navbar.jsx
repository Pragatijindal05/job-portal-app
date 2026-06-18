import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide text-indigo-400">Career<span className="text-white">Hub</span></div>
      <div className="space-x-6 hidden md:flex">
        <a href="#" className="hover:text-indigo-400 transition">Find Jobs</a>
        <a href="#" className="hover:text-indigo-400 transition">Dashboard</a>
        <a href="#" className="hover:text-indigo-400 transition">Companies</a>
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition">
        Post a Job
      </button>
    </nav>
  );
}