import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: 200,
      trim: true,
    },
    tags: { type: String, default: [] },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export type INote = InferSchemaType<typeof noteSchema>;

export default mongoose.model<INote>("Note", noteSchema);
