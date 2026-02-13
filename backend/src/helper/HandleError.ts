import type { Response } from "express";

export function handleError(error: unknown, res: Response) {
  console.error("Error: ", error);
  res.status(500).json({ error: "Internal Server Error" });
}
