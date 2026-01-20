import express from "express";
import GalleryItem from "../models/GalleryItem.js";

const router = express.Router();

router.get("/groups", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("GET /groups ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


// =======================
// DELETE ROUTE
// =======================
router.delete("/delete", async (req, res) => {
  try {
    const { url, group } = req.body;

    if (!url || !group) {
      return res.status(400).json({ message: "Missing url or group" });
    }

    const deleted = await GalleryItem.findOneAndDelete({ url, group });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /delete ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;