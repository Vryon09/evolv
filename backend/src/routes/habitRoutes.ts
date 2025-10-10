import express from "express";
import {
  addHabit,
  getHabits,
  updateHabit,
} from "../controller/habitsController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/", protect, getHabits);

router.post("/", protect, addHabit);

router.patch("/:id", protect, updateHabit);

export default router;
