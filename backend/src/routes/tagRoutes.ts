import express from "express";
import { addTag, getTags } from "../controller/tagsController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/", protect, getTags);

router.post("/", protect, addTag);

export default router;
