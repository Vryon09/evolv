import { Router } from "express";
import {
  addJournal,
  deleteJournal,
  getJournals,
} from "../controller/journalController.ts";
import { protect } from "../middleware/authMiddleware.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { createJournalSchema } from "../schemas/journalSchema.ts";

const router = Router();

router.get("/", protect, getJournals);
router.post("/", protect, validateSchema(createJournalSchema), addJournal);
router.delete("/:id", protect, deleteJournal);

export default router;
