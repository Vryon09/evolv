import express from "express";
import { protect } from "../middleware/authMiddleware.ts";
import { updatePomodoroSettings } from "../controller/pomodoroController.ts";

const router = express.Router();

router.patch("/", protect, updatePomodoroSettings);

export default router;
