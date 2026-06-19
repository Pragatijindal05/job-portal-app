import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_CONNECTION_STRING = "mongodb+srv://pragatijindal05:Harsh@123@cluster0.okdgbuu.mongodb.net/jobportal?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_CONNECTION_STRING)
  .then(() => console.log("MongoDB Connected Successfully! 🚀"))
  .catch(err => console.error("Database connection error:", err));

// 2. Schema
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, default: "Not Disclosed" },
  description: { type: String, required: true }
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

// 3. Routes
app.get('/', (req, res) => {
    res.send('CareerHub API Engine is live and connected to cloud MongoDB.');
});

app.get('/api/jobs', async (req, res) => {
  try {
    const dbJobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(dbJobs);
  } catch (err) {
    res.status(500).json({ error: "Data fetch nahi ho paya server se." });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const { title, company, type, location, description, salary } = req.body;

    if (!title || !company || !type || !location || !description) {
        return res.status(400).json({ message: "Required fields missing." });
    }

    const newJob = new Job({ title, company, type, location, salary, description });
    const savedJob = await newJob.save();
    res.status(201).json({ message: "Job listing published successfully!", job: savedJob });
  } catch (err) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.listen(PORT, () => {
    console.log(`Backend server running smoothly on port ${PORT}`);
});