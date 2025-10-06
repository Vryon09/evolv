import type { Request, Response } from "express";
import User from "../models/User.ts";
import { generateToken } from "../utils/generateToken.ts";

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

    const userData = savedUser.toObject();

    const token = generateToken(savedUser._id.toString());

    res.status(201).json({
      message: "User created successfully.",
      token,
      user: { _id: userData._id, name: userData.name, email: userData.email },
    });
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

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      message: "Login successful.",
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error in loginUser controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
