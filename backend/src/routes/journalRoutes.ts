import { Router } from "express";
import { getJournals } from "../controller/journalController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();

router.get("/", protect, getJournals);

export default router;
