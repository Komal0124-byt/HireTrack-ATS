import Candidate from "../models/Candidate.js";

// Add Candidate
export const addCandidate = async (req, res) => {
  try {
    const { name, email, phone, job, status } = req.body;

    const resume = req.file ? req.file.filename : "";

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
export const updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      message: "Candidate status updated successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};