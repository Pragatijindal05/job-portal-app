import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });
  const [message, setMessage] = useState('');

  // Clean fetch to use dynamic API Base URL
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? job.type === filterType : true;
    const matchesLocation = filterLocation ? job.location === filterLocation : true;
    return matchesSearch && matchesType && matchesLocation;
  });

  // Clean POST fetch to use dynamic API Base URL
  const handleApplySubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: selectedJob.id,
        applicantName: formData.name,
        applicantEmail: formData.email,
        resumeLink: formData.resume
      })
    })
    .then(res => res.json())
    .then(data => {
      setMessage(data.message);
      setTimeout(() => {
        setSelectedJob(null);
        setFormData({ name: '', email: '', resume: '' });
        setMessage('');
      }, 2000);
    })
    .catch(err => console.error("Error submitting application:", err));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* Hero Search Section */}
      <header className="bg-slate-900 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Find Your Dream Tech Job</h1>
        <p className="text-slate-400 mb-6">Explore frontend, backend, and fullstack opportunities.</p>
        <div className="max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search by job title or company..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
          />
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <FilterSidebar setFilterType={setFilterType} setFilterLocation={setFilterLocation} />
        </aside>

        <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onApply={setSelectedJob} />
            ))
          ) : (
            <p className="text-slate-500 col-span-full text-center py-10">No jobs match your search parameters.</p>
          )}
        </section>
      </main>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl">&times;</button>
            <h3 className="text-xl font-bold text-slate-800 mb-1">Apply for {selectedJob.title}</h3>
            <p className="text-indigo-600 text-sm mb-4">{selectedJob.company}</p>

            {message ? (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-center font-medium">{message}</div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Resume Link (Google Drive/Dropbox)</label>
                  <input type="url" placeholder="https://" value={formData.resume} onChange={e => setFormData({...formData, resume: e.target.value})} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition mt-2">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}