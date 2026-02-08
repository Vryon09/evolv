import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const habitSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // a habit must belong to a user
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: 200,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
    },
    streak: {
      type: Number,
      default: 0,
    },
    bestStreak: {
      type: Number,
      default: 0,
    },
    bestStreakAchievedAt: {
      type: Date,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    completedDates: [
      {
        type: Date,
      },
    ],
    tags: [{ type: String, trim: true, lowercase: true }],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export type IHabit = InferSchemaType<typeof habitSchema>;

export default mongoose.model<IHabit>("Habit", habitSchema);
