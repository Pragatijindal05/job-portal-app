import React from 'react';

export default function JobCard({ job, onApply }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {job.type}
          </span>
        </div>
        <p className="text-indigo-600 font-medium text-sm mb-3">{job.company}</p>
        <div className="flex items-center space-x-4 text-slate-500 text-sm mb-4">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
        </div>
        <p className="text-slate-600 text-sm line-clamp-3 mb-6">{job.description}</p>
      </div>
      
      <button 
        onClick={() => onApply(job)}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg transition text-center"
      >
        Apply Now
      </button>
    </div>
  );
}