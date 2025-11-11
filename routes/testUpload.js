import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/test-upload", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload("./test.jpg"); // any small image in your project folder
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
