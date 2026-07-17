import express from "express";
import {
  addJob,
  getJobs,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", addJob);
router.get("/", getJobs);
router.delete("/:id", deleteJob);
router.put("/:id", updateJob);
export default router;