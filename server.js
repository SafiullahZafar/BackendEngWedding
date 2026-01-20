import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import galleryRoutes from "./routes/galleryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import musicRoutes from "./routes/music.routes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== SERVE UPLOADS (IMPORTANT) =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use(express.urlencoded({ extended: true }));
app.use("/api/music", musicRoutes);

// ===== DATABASE =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ===== SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});