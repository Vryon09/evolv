import { Router } from "express";
import {
  addJournal,
  deleteJournal,
  getJournals,
} from "../controller/journalController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();

router.get("/", protect, getJournals);
router.post("/", protect, addJournal);
router.post("/:id", protect, deleteJournal);

export default router;
