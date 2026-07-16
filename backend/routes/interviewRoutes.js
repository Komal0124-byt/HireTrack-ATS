import express from "express";
import {
  addInterview,
  getInterviews,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", addInterview);
router.get("/", getInterviews);

export default router;