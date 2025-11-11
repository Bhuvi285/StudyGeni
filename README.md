# 🚀 StudyGeni — AI-Powered Study Material Management System

> An intelligent backend system that empowers **teachers** to upload study materials and **students** to access AI-generated **summaries** and **quizzes** for smart learning.

---

## 🧠 Project Overview

**StudyGeni** is a backend web application built using **Node.js**, **Express**, and **MongoDB**, integrated with **Cloudinary** for file uploads and **OpenRouterAI** for AI-powered learning content generation.

It provides **role-based access control**:
- 👨‍🏫 **Teachers** → can upload, view, and generate AI-based summaries/quizzes.  
- 🧑‍🎓 **Students** → can only view and generate summaries/quizzes.

---

## ⚙️ Features

| Feature | Description |
|----------|-------------|
| 🔐 **Authentication** | JWT-based secure login and registration |
| 👨‍🏫 **Role Management** | Teachers and Students have different privileges |
| ☁️ **File Uploads** | Upload and store files using Cloudinary |
| 🧠 **AI Integration** | Auto-generate summaries and quizzes via OpenRouterAI |
| 🧾 **MongoDB Atlas** | Store user and file data efficiently |
| ⚖️ **Access Control** | Middleware restricts upload access to teachers only |
| 🌐 **RESTful API** | Clean, modular routes with Express architecture |
| 🚀 **Deployable** | Easily deployable on Vercel or Render |

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas |
| **ORM** | Mongoose |
| **Authentication** | JWT + bcryptjs |
| **File Storage** | Cloudinary |
| **AI Model API** | OpenRouterAI |
| **Upload Handler** | Multer |
| **Environment Config** | dotenv |
| **Server Deployment** | Vercel / Render |
| **API Testing** | Postman |

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your_username>/StudyGenAi-backend.git
cd StudyGenAi-backend

2️⃣ Install Dependencies
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken multer cloudinary node-fetch
npm install --save-dev nodemon

3️⃣ Configure Environment Variables
Create a .env file in the root directory:
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studygeni
JWT_SECRET=my_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENROUTER_API_KEY=your_openrouter_api_key

4️⃣ Run the Server
npm run dev
✅ Server will start at:
http://localhost:5000

🗂️ Folder Structure
StudyGenAi/
 ┣ api/
 ┃ ┗ index.js               ← Entry point of the app
 ┣ config/
 ┃ ┣ db.js                  ← MongoDB connection setup
 ┃ ┗ cloudinary.js          ← Cloudinary configuration
 ┣ controllers/
 ┃ ┣ authController.js      ← Handles register/login logic
 ┃ ┣ fileController.js      ← Handles file upload & retrieval
 ┃ ┗ aiController.js        ← Handles AI summary & quiz generation
 ┣ middleware/
 ┃ ┣ authMiddleware.js      ← JWT verification & role-based access
 ┃ ┗ uploadMiddleware.js    ← Multer setup for file handling
 ┣ models/
 ┃ ┣ User.js                ← User schema (name, email, password, role)
 ┃ ┗ File.js                ← File schema (title, subject, fileUrl, createdBy)
 ┣ routes/
 ┃ ┣ authRoutes.js          ← Routes for authentication
 ┃ ┣ fileRoutes.js          ← Routes for uploading/viewing files
 ┃ ┗ aiRoutes.js            ← Routes for AI summary & quiz
 ┣ uploads/                 ← Temporary local file storage (for multer)
 ┣ .env                     ← Environment variables (ignored by Git)
 ┣ package.json             ← Project metadata and dependencies
 ┣ vercel.json              ← Vercel deployment configuration
 ┗ README.md                ← Project documentation

🧩 Workflow Explanation
🔹 1. Server Initialization

api/index.js starts the Express server.

Loads environment variables using dotenv.

Connects to MongoDB.

Initializes routes for /auth, /files, and /ai.

🔹 2. Database Connection

config/db.js connects to MongoDB Atlas using Mongoose.

Prints a success message once connected.

🔹 3. Authentication

authController.js manages user registration and login.

Passwords are hashed using bcryptjs.

Generates JWT tokens on successful login.

authMiddleware.js validates tokens and attaches the user to requests.

🔹 4. Role-Based Access

Each user has a role (student or teacher).

Middleware teacherOnly ensures only teachers can upload.

🔹 5. File Upload

Teachers upload study materials using POST /api/files.

multer handles uploads, cloudinary stores them in the cloud.

File metadata is saved in MongoDB with File.js schema.

🔹 6. File Retrieval

Both teachers and students can use:

GET /api/files → All materials

GET /api/files/:id → Specific file details

🔹 7. AI Summary & Quiz

aiController.js uses OpenRouterAI API to:

GET /api/files/:id/summary → Summarize material

GET /api/files/:id/quiz → Generate quiz

Uses node-fetch to call AI API with your key stored in .env.

🔹 8. Deployment (Vercel)

Configured via vercel.json:
{
  "version": 2,
  "builds": [{ "src": "api/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "api/index.js" }]
}
Environment variables are added via Vercel dashboard.

🌐 API Endpoints Summary
Method	Endpoint	Description	Access
POST	/api/auth/register	Register new user	Public
POST	/api/auth/login	Login and get JWT	Public
GET	/api/auth/me	Get logged-in user details	Authenticated
POST	/api/files	Upload a new file	Teacher only
GET	/api/files	Get all files	Authenticated
GET	/api/files/:id/summary	AI-generated summary	Authenticated
GET	/api/files/:id/quiz	AI-generated quiz	Authenticated

💡 How It Works

Authentication:
Users register/login to receive a JWT token.

Upload:
Teachers upload materials → files go to Cloudinary → metadata saved in MongoDB.

Access:
Students and teachers can view files.

AI Features:
OpenRouterAI generates:

Summaries → /api/files/:id/summary

Quizzes → /api/files/:id/quiz

Access Control:
Teachers = Upload + View
Students = View + AI Tools

| Command       | Description                        |
| ------------- | ---------------------------------- |
| `npm install` | Install all dependencies           |
| `npm run dev` | Start server in dev mode (nodemon) |
| `npm start`   | Start server normally              |
| `git push`    | Push code to GitHub                |
| `vercel`      | Deploy to Vercel                   |

🏁 Final Notes

✅ StudyGeni Backend showcases:

Modern API architecture with Express.js

Secure JWT-based role authentication

AI-assisted education tools via OpenRouterAI

File handling via Cloudinary

Clean, modular, and deployable Node.js backend

🎯 This backend can be connected easily with a React or EJS frontend for a complete full-stack learning platform.


👨‍💻 Author

Developed by: Bhuvanesh Neve

Mentorship & Event: CODSOFT / Node.js Backend Event (Post-Event Task)


---

✅ Just copy this entire Markdown text and paste it into your `README.md` file.  
GitHub will render it perfectly formatted with tables, emojis, and syntax highlighting.  

Would you like me to also create a **short GitHub project description** (1–2 lines) and **repository tags** (like `#Nodejs`, `#MongoDB`, `#AI`, `#Cloudinary`)?  
You can paste those in your GitHub repo settings for a professional look.

