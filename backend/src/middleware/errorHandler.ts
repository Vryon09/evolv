import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  res.status(500).json({
    success: false,
    error: "Internal Srver Error",
    message: err.message || "Something went wrong",
  });
}
