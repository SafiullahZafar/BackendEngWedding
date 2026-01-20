import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    filename: String,
    type: {
      type: String,
      enum: ["image", "video"],
    },
    group: {
      type: String,
      enum: ["group1", "group2", "group3", "group4", "group5", "group6"],
    },
    url: String,
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", galleryItemSchema);
