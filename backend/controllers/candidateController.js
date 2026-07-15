import Candidate from "../models/Candidate.js";

// Add Candidate
export const addCandidate = async (req, res) => {
  try {
    const { name, email, phone, job, status, resume } = req.body;

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      job,
      status,
      resume,
    });

    res.status(201).json({
      message: "Candidate added successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Candidates
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};