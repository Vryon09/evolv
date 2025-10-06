import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
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
        type: Schema.Types.ObjectId,
        ref: "Habit",
      },
    ],
    journals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Journal",
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    contacts: [
      {
        type: Schema.Types.ObjectId,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export type IUser = InferSchemaType<typeof userSchema> & {
  comparePassword: (enteredPassword: string) => Promise<boolean>;
};

export default mongoose.model<IUser>("User", userSchema);
