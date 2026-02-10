import { Router } from "express";
import { addMood, deleteMood, getMood } from "../controller/moodController.ts";
import { protect } from "../middleware/authMiddleware.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { createMoodSchema } from "../schemas/moodSchema.ts";

const router = Router();

router.get("/", protect, getMood);
router.post("/", protect, validateSchema(createMoodSchema), addMood);
router.delete("/:id", protect, deleteMood);

export default router;
