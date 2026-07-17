import express from "express";
import {
  addCandidate,
  getCandidates,
  updateCandidateStatus,
  deleteCandidate,
} from "../controllers/candidateController.js";
import upload from "../middlewares/uploadMiddleware.js";
const router = express.Router();
router.get("/", getCandidates);

router.post(
  "/",
  upload.single("resume"),
  addCandidate
);
router.put("/:id/status", updateCandidateStatus);
router.delete("/:id", deleteCandidate);
export default router;