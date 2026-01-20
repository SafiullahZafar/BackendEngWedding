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

export default router;