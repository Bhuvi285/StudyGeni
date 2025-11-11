import File from "../models/File.js";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
};

/**
 * Generate AI Summary for a file
 */
export const getFileSummary = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const prompt = `
    Summarize this study material:
    Title: ${file.title}
    Subject: ${file.subject}
    Description: ${file.description}
    `;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or any other available model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json({
      summary: data.choices?.[0]?.message?.content || "No summary generated",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Generate AI Quiz for a file
 */
export const getFileQuiz = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const prompt = `
    Based on this study material, create 5 short quiz questions:
    Title: ${file.title}
    Subject: ${file.subject}
    Description: ${file.description}
    `;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json({
      quiz: data.choices?.[0]?.message?.content || "No quiz generated",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
