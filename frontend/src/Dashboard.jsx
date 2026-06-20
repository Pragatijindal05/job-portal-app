import React, { useState, useEffect, useContext } from 'react';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';
import { AuthContext } from './context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  // Fetch jobs
  const fetchJobs = () => {
    fetch(`${API_BASE_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Error fetching jobs:", err));
  };

  useEffect(() => { fetchJobs(); }, []);

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? job.type === filterType : true;
    const matchesLocation = filterLocation ? job.location === filterLocation : true;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="md:col-span-1">
        <FilterSidebar setFilterType={setFilterType} setFilterLocation={setFilterLocation} />
      </aside>

      {/* Job List */}
      <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard 
              key={job._id} 
              job={job} 
              onApply={user ? () => console.log("Applying...") : () => alert('Please login!')} 
            />
          ))
        ) : (
          <p className="col-span-full text-center">No jobs found.</p>
        )}
      </section>
    </div>
  );
}