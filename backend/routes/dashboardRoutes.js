import express from "express";
import {
  getDashboardStats,
  getRecentJobs,
  getRecentCandidates,
  getUpcomingInterviews,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/recent-jobs", getRecentJobs);
router.get("/recent-candidates", getRecentCandidates);
router.get("/upcoming-interviews", getUpcomingInterviews);

export default router;