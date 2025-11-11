import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import testUpload from "../routes/testUpload.js";
import fileRoutes from "../routes/fileRoutes.js";
import aiRoutes from "../routes/aiRoutes.js";

dotenv.config();
const app = express();

// ✅ Parse incoming JSON request bodies BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // handles form data

// Connect MongoDB
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", testUpload);
app.use("/api/files", fileRoutes);
app.use("/api", aiRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running and DB is connected...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
