import express from "express";
import { protect } from "../middleware/authMiddleware.ts";
import { updatePomodoroSettings } from "../controller/pomodoroController.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { updatePomodoroSchema } from "../schemas/pomodoroSchema.ts";

const router = express.Router();

router.patch(
  "/",
  protect,
  validateSchema(updatePomodoroSchema),
  updatePomodoroSettings,
);

export default router;
