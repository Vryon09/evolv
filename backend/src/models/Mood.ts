import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const moodSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: {
      type: String,
      enum: [
        "MISERABLE",
        "BAD",
        "DISPLEASED",
        "OKAY",
        "GOOD",
        "HAPPY",
        "JOYFUL",
      ],
      required: true,
    },
    stressLevel: { type: Number, min: 1, max: 5, default: 1 },
    sleep: {
      bedTime: {
        type: Date,
        required: true,
      },
      wakeTime: {
        type: Date,
        required: true,
      },
      duration: {
        type: Number,
        min: 0,
      },
      quality: {
        type: Number,
        min: 1,
        max: 4,
        required: true,
      },
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

moodSchema.pre("save", function (next) {
  if (this.sleep?.bedTime && this.sleep?.wakeTime) {
    if (this.sleep.wakeTime >= this.sleep.bedTime) {
      const diffMs =
        this.sleep.wakeTime.getTime() - this.sleep.bedTime.getTime();

      this.sleep.duration = diffMs / (1000 * 60 * 60);
    }
  }
  next();
});

export type IMood = InferSchemaType<typeof moodSchema>;

export default mongoose.model("Mood", moodSchema);
