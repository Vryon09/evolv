import type { Request, Response } from "express";
import Habit from "../models/Habit.ts";
import User from "../models/User.ts";

export async function addHabit(req: Request, res: Response): Promise<void> {
  try {
    const { title, description, frequency, tags } = req.body;
    const authUser = (req as any).user;

    const newHabit = new Habit({
      user: authUser._id,
      title,
      description,
      frequency,
      tags,
    });

    const savedHabit = await newHabit.save();

    await User.findByIdAndUpdate(authUser._id, {
      $push: { habits: savedHabit._id },
    });

    res.status(201).json(savedHabit);
  } catch (error) {
    console.error("Error in addHabit controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
