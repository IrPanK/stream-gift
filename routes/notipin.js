import express from "express";

import { getNotipin, createNotipin } from "../controllers/notipin.js";

const router = express.Router();

router.get("/", getNotipin);
router.post("/", createNotipin);

export default router;
