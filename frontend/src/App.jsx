import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddJob from './components/AddJob';
import ProtectedRoute from './components/ProtectedRoute'; // Import karo

// ... baaki imports wahi rahenge

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Yahan AddJob protected hai */}
        <Route path="/add-job" element={
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}