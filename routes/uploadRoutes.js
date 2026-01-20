import express from "express";
import multer from "multer";
import GalleryItem from "../models/GalleryItem.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const group = req.params.group || "group1";
    const dir = path.join(__dirname, "..", "uploads", group);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});

const upload = multer({ storage });

router.post("/:group", upload.single("file"), async (req, res) => {
  try {
    const group = req.params.group || "group1";
    const file = req.file;

    const isVideo = file.mimetype.startsWith("video");

    const item = await GalleryItem.create({
      filename: file.filename,
      type: isVideo ? "video" : "image",
      group,
      url: `http://localhost:5000/uploads/${group}/${file.filename}`,
    });

    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

export default router;