import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  salary: String
});

const Job = mongoose.model('Job', jobSchema);
export default Job;