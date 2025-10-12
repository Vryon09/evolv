import express from "express";
import {
  addHabit,
  completeHabit,
  deleteHabit,
  getHabits,
  updateHabit,
} from "../controller/habitsController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/", protect, getHabits);

router.post("/", protect, addHabit);

router.patch("/:id", protect, updateHabit);

router.delete("/:id", protect, deleteHabit);

router.patch("/:id/complete", protect, completeHabit);

export default router;
