import express from "express";
import { addHabit } from "../controller/habitsController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/", protect, addHabit);

export default router;
