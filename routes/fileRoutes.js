import express from "express";
import { uploadFile, getFiles } from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Middleware to allow only teachers
const teacherOnly = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied. Teachers only." });
  }
  next();
};

// Teacher upload
router.post("/", protect, teacherOnly, upload.single("file"), uploadFile);

// All users (students + teachers) view files
router.get("/", protect, getFiles);

export default router;
