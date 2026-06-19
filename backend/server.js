const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors());
app.use(express.json()); // Crucial: Allows backend to read JSON body data sent from frontend

const DATA_PATH = path.join(__dirname, 'data', 'jobs.json');

// Helper function to read data safely
const readJobsData = () => {
    try {
        const jsonData = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Error reading jobs file:", error);
        return [];
    }
};

// Helper function to write data safely
const writeJobsData = (data) => {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("Error writing to jobs file:", error);
        return false;
    }
};

// 1. GET Endpoint: Fetch all jobs (Existing 20%)
app.get('/api/jobs', (req, res) => {
    const jobs = readJobsData();
    res.status(200).json(jobs);
});

// 2. POST Endpoint: Create a new job listing (Upgrading to 40%!)
app.post('/api/jobs', (req, res) => {
    const { title, company, type, location, description, salary } = req.body;

    // Simple validation to ensure required fields are present
    if (!title || !company || !type || !location) {
        return res.status(400).json({ message: "Required fields missing: title, company, type, or location." });
    }

    const jobs = readJobsData();

    // Create a new structured job object
    const newJob = {
        id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id || 0)) + 1 : 1, // Auto-increment ID safely
        title,
        company,
        type,
        location,
        description: description || "No description provided.",
        salary: salary || "Not Disclosed",
        postedAt: new Date().toISOString().split('T')[0] // Formats as YYYY-MM-DD
    };

    jobs.push(newJob);

    if (writeJobsData(jobs)) {
        res.status(201).json({ message: "Job listing published successfully!", job: newJob });
    } else {
        res.status(500).json({ message: "Failed to persist data on server database." });
    }
});

// Root check endpoint
app.get('/', (req, res) => {
    res.send('CareerHub API Engine is live and fully operational.');
});

app.listen(PORT, () => {
    console.log(`Backend server running smoothly on port ${PORT}`);
});