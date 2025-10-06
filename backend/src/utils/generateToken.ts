import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
  return token;
}
