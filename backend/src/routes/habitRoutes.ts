import express from "express";
import {
  addHabit,
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

export default router;
