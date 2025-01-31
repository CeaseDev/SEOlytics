import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export const authenticate = (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers) ;
  console.log(token) ;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = verifyToken(token) as { userId: string };
    console.log(decoded) ;
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};