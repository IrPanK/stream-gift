import express from "express";

import { createVideoni, getVideoni } from "../controllers/videoni.js";

const router = express.Router();

router.get("/", getVideoni);
router.post("/", createVideoni);

export default router;
