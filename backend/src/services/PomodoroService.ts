import { ObjectId } from "mongoose";
import User from "../models/User.ts";
import type { UpdatePomodoroInput } from "../schemas/pomodoroSchema.ts";

class PomodoroService {
  async updatePomodoroSettings(
    userId: ObjectId,
    updatedSettings: UpdatePomodoroInput,
  ) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { pomodoroSettings: updatedSettings },
        {
          new: true,
        },
      );

      if (!user) {
        throw new Error("User not found.");
      }

      return { message: "Pomodoro setting updated." };
    } catch (error) {
      throw error;
    }
  }
}

export const pomodoroService = new PomodoroService();
