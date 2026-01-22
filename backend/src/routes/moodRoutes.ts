import { Router } from "express";
import { addMood, deleteMood, getMood } from "../controller/moodController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();

router.get("/", protect, getMood);
router.post("/", protect, addMood);
router.delete("/:id", protect, deleteMood);

export default router;
