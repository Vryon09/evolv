import { Router } from "express";
import { addJournal, getJournals } from "../controller/journalController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();

router.get("/", protect, getJournals);
router.post("/", protect, addJournal);

export default router;
