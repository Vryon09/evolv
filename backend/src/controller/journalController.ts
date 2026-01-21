import type { Request, Response } from "express";
import type { IJournal } from "../models/Journal.ts";
import User from "../models/User.ts";
import Journal from "../models/Journal.ts";

export async function getJournals(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const journals = await User.findById(authUser._id)
      .populate<{ journals: IJournal[] }>({
        path: "journals",
        model: Journal,
        match: { isArchived: false },
      })
      .select("journals");

    if (!journals) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(journals.journals);
  } catch (error) {
    console.error("Error in getJournals controller: " + error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

//create addJournal controller
export async function addJournal(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const authUser = (req as any).user;

    const newJournal = new Journal({ user: authUser._id, title, content });

    const savedJournal = await newJournal.save();

    await User.findByIdAndUpdate(authUser._id, {
      $push: { journals: savedJournal._id },
    });

    res.status(200).json(savedJournal);
  } catch (error) {
    console.error("Error in addJournal controller: " + error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
