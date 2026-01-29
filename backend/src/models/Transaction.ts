import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const transactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Expense", "Income"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
      max: 1_000_000_000,
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
  },
);

export type ITransaction = InferSchemaType<typeof transactionSchema>;

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
