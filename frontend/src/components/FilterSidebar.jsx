import React, { useState, useEffect } from 'react';

export default function FilterSidebar({ setFilterType, setFilterLocation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // API call karo saari locations lene ke liye
    const fetchLocations = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/jobs/locations`); // Naya API endpoint
      const data = await res.json();
      setLocations(data); // ['Remote', 'Pune', 'Bangalore'...]
    };
    fetchLocations();
  }, []);

  return (
    // ... aapka JSX
    <select onChange={(e) => setFilterLocation(e.target.value)}>
      <option value="">All Locations</option>
      {locations.map((loc) => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </select>
  );
}