import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token; // optional chaining to avoid crash

  if (!token) {
    return res.status(401).json({ message: "🛑 Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET! || "SuperSecretKey123!@#456");
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "🛑 Invalid token" });
  }
};
