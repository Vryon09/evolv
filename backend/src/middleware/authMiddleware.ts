import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.ts";
import type { IUser } from "../models/User.ts";

interface JwtPayload {
  id: string;
}

interface UserRequest extends Request {
  user?: IUser;
}

export async function protect(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as JwtPayload;

      console.log(decoded);

      req.user = (await User.findById(decoded.id).select(
        "-password"
      )) as UserRequest["user"];

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
}
