import express from "express";

import { getSteamer, createStreamer } from "../controllers/streamer.js";

const router = express.Router();

router.get("/", getSteamer);
router.post("/", createStreamer);

export default router;
