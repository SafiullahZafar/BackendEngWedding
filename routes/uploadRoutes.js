import express from "express";
import multer from "multer";
import GalleryItem from "../models/GalleryItem.js";
import r2 from "../utils/r2Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();

// ✅ MEMORY STORAGE (NO DISK)
const upload = multer({
  storage: multer.memoryStorage(),
});

// ✅ UPLOAD TO R2
router.post("/:group", upload.single("file"), async (req, res) => {
  try {
    const group = req.params.group || "group1";
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const key = `${group}/${Date.now()}-${file.originalname}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const url = `${process.env.R2_PUBLIC_URL}/${key}`;

    const item = await GalleryItem.create({
      filename: key,
      type: file.mimetype.startsWith("video") ? "video" : "image",
      group,
      url,
    });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
