import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getFileSummary, getFileQuiz } from "../controllers/aiController.js";

const router = express.Router();

router.get("/files/:id/summary", protect, getFileSummary);
router.get("/files/:id/quiz", protect, getFileQuiz);

export default router;
