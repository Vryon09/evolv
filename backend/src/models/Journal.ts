import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const journalSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    tags: { type: String, default: [] },
    mood: {
      type: String,
      enum: ["happy", "sad", "neutral", "angry", "excited"],
      default: "neutral",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type IJournal = InferSchemaType<typeof journalSchema>;

export default mongoose.model("Journal", journalSchema);
