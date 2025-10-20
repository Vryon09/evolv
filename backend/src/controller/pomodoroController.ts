import type { Request, Response } from "express";
import User from "../models/User.ts";

export async function updatePomodoroSettings(req: Request, res: Response) {
  try {
    const updatedSettings = req.body;

    const authUser = (req as any).user;

    if (!authUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findByIdAndUpdate(
      authUser._id,
      { pomodoroSettings: updatedSettings },
      {
        new: true,
      }
    );

    if (!user) {
      res.status(401).json({ message: "User not found." });
      return;
    }

    console.log(user.toObject());

    res.status(200).json(user.toObject());
  } catch (error) {
    console.error("Error in updatePomodoroSettings controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
