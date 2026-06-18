import React from 'react';

export default function FilterSidebar({ setFilterType, setFilterLocation }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Filters</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-600 mb-2">Job Type</label>
        <select 
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Location</label>
        <select 
          onChange={(e) => setFilterLocation(e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="New York, NY">New York</option>
        </select>
      </div>
    </div>
  );
}