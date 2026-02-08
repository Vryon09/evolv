import express from "express";
import {
  addHabit,
  completeHabit,
  deleteHabit,
  getHabits,
  updateHabit,
} from "../controller/habitsController.ts";
import { protect } from "../middleware/authMiddleware.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import {
  createHabitSchema,
  updateHabitSchema,
} from "../schemas/habitSchema.ts";

const router = express.Router();

router.get("/", protect, getHabits);

router.post("/", protect, validateSchema(createHabitSchema), addHabit);

router.patch("/:id", protect, validateSchema(updateHabitSchema), updateHabit);

router.delete("/:id", protect, deleteHabit);

router.patch("/:id/complete", protect, completeHabit);

export default router;
