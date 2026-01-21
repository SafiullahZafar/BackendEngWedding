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
    console.log("🚀 Upload request received");

    const group = req.params.group || "group1";
    console.log("Group:", group);

    const file = req.file;

    if (!file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File received:", file.originalname, file.mimetype, file.size);

    // 👉 Unique key for R2
    const key = `${group}/${Date.now()}-${file.originalname}`;
    console.log("R2 Key:", key);

    // 👉 Upload to R2
    const uploadResult = await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    console.log("✅ Uploaded to R2:", uploadResult);

    // 👉 Public URL
    const url = `${process.env.R2_PUBLIC_URL}/${key}`;
    console.log("Public URL:", url);

    // 👉 Save in MongoDB
    const item = await GalleryItem.create({
      filename: key,
      type: file.mimetype.startsWith("video") ? "video" : "image",
      group,
      url,
    });

    console.log("✅ Saved in DB:", item);

    // ✅ Success response
    res.status(200).json(item);

  } catch (err) {
    // ❌ Print error details in console
    console.error("UPLOAD ERROR:", err);

    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
