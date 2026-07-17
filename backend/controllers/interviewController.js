import Interview from "../models/Interview.js";

// Add Interview
export const addInterview = async (req, res) => {
  try {
    const { candidate, interviewer, date, status, notes } = req.body;

    const interview = await Interview.create({
      candidate,
      interviewer,
      date,
      status,
      notes,
    });

    res.status(201).json({
      message: "Interview scheduled successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Interviews
export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate({
        path: "candidate",
        select: "name email status",
        populate: {
          path: "job",
          select: "title company",
        },
      })
      .sort({ date: 1 });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Interview
export const updateInterview = async (req, res) => {
  try {
    const { candidate, interviewer, date, status, notes } = req.body;

    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      {
        candidate,
        interviewer,
        date,
        status,
        notes,
      },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.status(200).json({
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Interview
export const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.status(200).json({
      message: "Interview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};