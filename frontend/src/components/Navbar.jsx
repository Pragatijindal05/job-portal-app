import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // Agar aap AuthContext use kar rahe hain toh yahan se user check kar sakte hain
  // const { user, logout } = useContext(AuthContext); 

  return (
    <nav className="border-b border-slate-100 bg-white py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-slate-900">
          Job<span className="text-indigo-600">Portal</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/jobs" className="hover:text-indigo-600 transition">Jobs</Link>
          <Link to="/browse" className="hover:text-indigo-600 transition">Browse</Link>
        </div>

        {/* Login/Signup Buttons */}
        <div className="flex gap-3">
          <Link to="/login" className="px-5 py-2 rounded-full font-semibold text-slate-700 hover:bg-slate-100 transition">
            Login
          </Link>
          <Link to="/register" className="px-5 py-2 rounded-full font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}