import Job from "../models/Job.js";
import Candidate from "../models/Candidate.js";
import Interview from "../models/Interview.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalCandidates = await Candidate.countDocuments();
    const totalInterviews = await Interview.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalJobs,
      totalCandidates,
      totalInterviews,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getRecentJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};