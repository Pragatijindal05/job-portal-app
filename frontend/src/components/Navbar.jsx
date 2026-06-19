import React from 'react';

export default function Navbar({ onPostJobClick }) {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💼</span>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-slate-900 bg-clip-text text-transparent">
              Career Connect
            </span>
          </div>
          
          <button 
            onClick={onPostJobClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-xl transition text-sm shadow-sm"
          >
            Post a Job
          </button>
        </div>
      </div>
    </nav>
  );
}