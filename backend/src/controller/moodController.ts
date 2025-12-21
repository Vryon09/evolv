import type { Request, Response } from "express";
import Mood from "../models/Mood.ts";
import type { IMood } from "../models/Mood.ts";
import User from "../models/User.ts";

export async function getMood(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userWithMoods = await User.findById(authUser._id)
      .populate<{ moods: IMood[] }>({
        path: "moods",
        model: Mood,
        match: { isArchived: false },
      })
      .select("moods");

    if (!userWithMoods) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userWithMoods.moods);
  } catch (error) {
    console.error("Error in getMood controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addMood(req: Request, res: Response) {
  try {
    const { mood, sleep, stressLevel } = req.body;
    const authUser = (req as any).user;

    const newMood = new Mood({
      user: authUser._id,
      mood,
      sleep,
      stressLevel,
    });

    const savedMood = await newMood.save();

    await User.findByIdAndUpdate(authUser._id, {
      $push: { moods: savedMood._id },
    });

    res.status(201).json(savedMood);
  } catch (error) {
    console.error("Error in addMood controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
