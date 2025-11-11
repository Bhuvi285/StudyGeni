// api/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import testUpload from "../routes/testUpload.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", testUpload);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 StudyGeni API is live and connected to MongoDB!");
});

// ✅ Export the app for Vercel
export default app;
