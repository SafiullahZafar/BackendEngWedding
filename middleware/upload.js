import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/gallery");
  },
  filename: (req, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for videos
  fileFilter: (req, file, cb) => {
    const allowed =
      /jpeg|jpg|png|webp|mp4|mov|webm/;
    const ext = allowed.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mime =
      file.mimetype.startsWith("image") ||
      file.mimetype.startsWith("video");

    if (ext && mime) cb(null, true);
    else cb(new Error("Only images & videos allowed"));
  }
});

export default upload;
