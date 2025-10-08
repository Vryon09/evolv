import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const contactSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
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

export type IContact = InferSchemaType<typeof contactSchema>;
export default mongoose.model("Contact", contactSchema);
