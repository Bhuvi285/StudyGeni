// middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const storage = multer.memoryStorage(); // ✅ no local folder — keeps file in memory

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .png, or .pdf files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
