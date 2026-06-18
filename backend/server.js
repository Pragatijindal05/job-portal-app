import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const jobsFilePath = path.join(__dirname, 'data', 'jobs.json');

// GET: Fetch all jobs
app.get('/api/jobs', (req, res) => {
    fs.readFile(jobsFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading data" });
        res.json(JSON.parse(data));
    });
});

// POST: Submit a job application
app.post('/api/applications', (req, res) => {
    const { jobId, applicantName, applicantEmail, resumeLink } = req.body;
    
    if (!jobId || !applicantName || !applicantEmail) {
        return res.status(400).json({ message: "Please fill in all required fields." });
    }

    console.log(`New Application Received for Job ID ${jobId}:`, { applicantName, applicantEmail, resumeLink });
    
    res.status(201).json({ message: "Application submitted successfully!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));