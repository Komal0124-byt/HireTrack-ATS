import express from "express";
import { addJob, getJobs, deleteJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", addJob);
router.get("/", getJobs);
router.delete("/:id", deleteJob);
export default router;