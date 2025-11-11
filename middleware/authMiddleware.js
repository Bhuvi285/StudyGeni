import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // continue to next middleware/route
    } catch (error) {
      console.error("JWT error:", error.message);
      res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
