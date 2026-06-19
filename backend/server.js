import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Job from './models/Job.js'; // Ensure your path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_CONNECTION_STRING = "mongodb+srv://pragatijindal05:Harsh123@cluster0.okdgbuu.mongodb.net/jobportal?retryWrites=true&w=majority&appName=Cluster0";

// Seed Function
const seedJobs = async () => {
  const count = await Job.countDocuments();
  if (count === 0) {
    const sampleJobs = [
      { title: "Frontend Developer", company: "Google", location: "Remote", description: "Expertise in React.js and Tailwind CSS required.", salary: "$80,000" },
      { title: "Backend Engineer", company: "Amazon", location: "Bangalore", description: "Experience with Node.js and MongoDB needed.", salary: "$95,000" },
      { title: "UI/UX Designer", company: "Microsoft", location: "Hyderabad", description: "Creative designer for web and mobile apps.", salary: "$70,000" },
      { title: "Full Stack Intern", company: "StartUp Inc.", location: "Pune", description: "Opportunity to learn and grow with our core team.", salary: "$15,000" }
    ];
    await Job.insertMany(sampleJobs);
    console.log("4 professional sample jobs added successfully!");
  }
};

mongoose.connect(DB_CONNECTION_STRING)
  .then(async () => {
    console.log("MongoDB Connected Successfully! 🚀");
    await seedJobs();
  })
  .catch(err => console.error("Database connection error:", err));

// Routes
// GET all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));