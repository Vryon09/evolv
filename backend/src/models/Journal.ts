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
      trim: true,
      maxlength: 5000,
      default: "",
    },
    tags: { type: String, default: [] },
    mood: {
      type: String,
      enum: [
        "miserable",
        "bad",
        "displeased",
        "okay",
        "good",
        "happy",
        "joyful",
      ],
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
