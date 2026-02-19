import type { Response } from "express";
import User from "../models/User.ts";
import type { UserRequest } from "../types/express.ts";
import { handleError } from "../helper/HandleError.ts";

export async function updatePomodoroSettings(req: UserRequest, res: Response) {
  try {
    const updatedSettings = req.body;

    const authUser = req.user!;

    if (!authUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findByIdAndUpdate(
      authUser._id,
      { pomodoroSettings: updatedSettings },
      {
        new: true,
      },
    );

    if (!user) {
      res.status(401).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user.toObject());
  } catch (error) {
    handleError(error, res);
  }
}
