import File from "../models/File.js";
import cloudinary from "../config/cloudinary.js";

// Upload file
export const uploadFile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, description, subject } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path);
    const newFile = await File.create({
      title,
      description,
      subject,
      fileUrl: result.secure_url,
      createdBy: req.user._id,
    });

    res.status(201).json(newFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all files
export const getFiles = async (req, res) => {
  try {
    const files = await File.find().populate("createdBy", "name role email");
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
