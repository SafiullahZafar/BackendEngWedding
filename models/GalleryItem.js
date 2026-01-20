import express from "express";
import GalleryItem from "../models/GalleryItem.js";

const router = express.Router();

router.get("/groups", async (req, res) => {
  const items = await GalleryItem.find();

  const groups = {
    group1: [],
    group2: [],
    group3: [],
    group4: [],
    group5: [],
    group6: [],
  };

  items.forEach((item) => {
    if (groups[item.group]) {
      groups[item.group].push(item.url);
    }
  });

  res.json(groups);
});


// =======================
// DELETE ROUTE (NEW)
// =======================
router.delete("/delete", async (req, res) => {
  try {
    const { url, group } = req.body;

    // Validate
    if (!url || !group) {
      return res.status(400).json({ message: "Missing url or group" });
    }

    // Remove from DB
    await GalleryItem.findOneAndDelete({ url, group });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});


export default router;