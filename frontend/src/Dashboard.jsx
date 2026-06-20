import React, { useState, useEffect } from 'react';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard'; 

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  // Filtered Jobs Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "" || job.type === filterType;
    const matchesLocation = filterLocation === "" || job.location === filterLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  // Apply function handler
  const handleApply = (job) => {
    alert(`Aap ${job.title} ke liye apply kar rahe hain!`);
    // Yahan aap API call add kar sakte hain: fetch('/api/apply', { method: 'POST'... })
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-white border-b">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6">
          Search, Apply & Get Your <span className="text-indigo-600">Dream Jobs</span>
        </h2>
        <div className="max-w-xl mx-auto flex bg-white p-2 rounded-full shadow-lg border border-slate-200">
          <input 
            type="text" 
            placeholder="Find your dream jobs..." 
            className="flex-grow p-4 rounded-full outline-none px-6"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition">
            Search
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <FilterSidebar setFilterType={setFilterType} setFilterLocation={setFilterLocation} />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-6">Latest & Top Job Openings</h3>
          {filteredJobs.length === 0 ? (
            <p className="text-slate-500">No jobs found matching your criteria.</p>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  onApply={handleApply} // Yahan humne function pass kar diya
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}