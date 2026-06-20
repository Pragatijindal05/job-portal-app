import React from 'react';

export default function FilterSidebar({ setFilterType, setFilterLocation }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit w-full md:w-64">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Filters</h3>
      
      {/* Job Type Filter */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Job Type</label>
        <select 
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Location</label>
        <select 
          onChange={(e) => setFilterLocation(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="New York, NY">New York</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Pune">Pune</option>
        </select>
      </div>
    </div>
  );
}