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