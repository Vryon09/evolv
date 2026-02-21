import express from "express";
import {
  addHabit,
  completeHabit,
  deleteHabit,
  getAllHabits,
  getHabits,
  getHabitsStats,
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

router.get("/all", protect, getAllHabits);

router.get("/stats", protect, getHabitsStats);

router.post("/", protect, validateSchema(createHabitSchema), addHabit);

router.patch("/:id", protect, validateSchema(updateHabitSchema), updateHabit);

router.delete("/:id", protect, deleteHabit);

router.patch("/:id/complete", protect, completeHabit);

export default router;
