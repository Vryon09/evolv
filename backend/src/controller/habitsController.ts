import type { Request, Response } from "express";
import Habit from "../models/Habit.ts";
import User from "../models/User.ts";

export async function getHabits(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userWithHabits = await User.findById(authUser._id)
      .populate({
        path: "habits",
        model: Habit,
      })
      .select("habits");

    if (!userWithHabits) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userWithHabits.habits);
  } catch (error) {
    console.error("Error in getHabits controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

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
