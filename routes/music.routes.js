import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const BASE_URL = process.env.BASE_URL;

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Midnight Drive",
      artist: "Neon Waves",
      url: `${BASE_URL}/uploads/music/song1.mp3`,
      duration: 0
    },
    {
      id: 2,
      title: "Cyber Dreams",
      artist: "Synth Rider",
      url: `${BASE_URL}/uploads/music/song2.mp3`,
      duration: 0
    },
    {
      id: 3,
      title: "Moonlight Echo",
      artist: "Lunar Flow",
      url: `${BASE_URL}/uploads/music/song3.mp3`,
      duration: 0
    },
    {
      id: 4,
      title: "Electric Sky",
      artist: "Voltage X",
      url: `${BASE_URL}/uploads/music/song4.mp3`,
      duration: 0
    },
    {
      id: 5,
      title: "Night Runner",
      artist: "Pulse City",
      url: `${BASE_URL}/uploads/music/song5.mp3`,
      duration: 0
    },
    {
      id: 6,
      title: "Starlight Path",
      artist: "Nova Sound",
      url: `${BASE_URL}/uploads/music/song6.mp3`,
      duration: 0
    },
    {
      id: 7,
      title: "Digital Heart",
      artist: "Binary Soul",
      url: `${BASE_URL}/uploads/music/song7.mp3`,
      duration: 0
    },
    {
      id: 8,
      title: "Dream Sequence",
      artist: "Echo Lab",
      url: `${BASE_URL}/uploads/music/song8.mp3`,
      duration: 0
    },
    {
      id: 9,
      title: "Final Horizon",
      artist: "Skyline",
      url: `${BASE_URL}/uploads/music/song9.mp3`,
      duration: 0
    }
  ]);
});

export default router;