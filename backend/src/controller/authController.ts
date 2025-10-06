import type { Request, Response } from "express";
import User from "../models/User.ts";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email already in use." });
      return;
    }

    const newUser = new User({ name, email, password });

    const savedUser = await newUser.save();

    const { password: _, ...userData } = savedUser.toObject();
    res.status(201).json({ user: userData });
  } catch (error) {
    console.error("Error in addUser controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error in loginUser controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
