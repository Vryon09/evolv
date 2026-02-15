import express from "express";
import { addTag, getTags } from "../controller/tagsController.ts";
import { protect } from "../middleware/authMiddleware.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { createTagSchema } from "../schemas/tagSchema.ts";

const router = express.Router();

router.get("/", protect, getTags);

router.post("/", protect, validateSchema(createTagSchema), addTag);

export default router;
