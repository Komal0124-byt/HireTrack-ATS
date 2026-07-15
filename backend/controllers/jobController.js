import Job from "../models/Job.js";

// Add New Job
export const addJob = async (req, res) => {
  try {
    const { title, company, location, type, status, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      type,
      status,
      description,
    });

    res.status(201).json({
      message: "Job added successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};