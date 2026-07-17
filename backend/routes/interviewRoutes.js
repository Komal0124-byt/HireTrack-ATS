import express from "express";
import {
  addInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", addInterview);
router.get("/", getInterviews);
router.put("/:id", updateInterview);
router.delete("/:id", deleteInterview);

export default router;