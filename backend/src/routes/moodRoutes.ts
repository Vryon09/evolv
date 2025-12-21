import { Router } from "express";
import { addMood, getMood } from "../controller/moodController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();

router.get("/", protect, getMood);
router.post("/", protect, addMood);

export default router;
