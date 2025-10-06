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

export async function addUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error in addUser controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
