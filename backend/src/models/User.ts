import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // don’t return by default for security
    },
    avatar: {
      type: String, // store URL (e.g. Cloudinary)
      default: "",
    },
    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },

    // preferences for UI or features
    settings: {
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },
      notificationsEnabled: {
        type: Boolean,
        default: true,
      },
    },

    // References to other collections
    habits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
      },
    ],
    journals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journal",
      },
    ],
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],

    // analytics or tracking
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
