import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
    console.log(req.user);

    return res.status(403).json({ error: "Admin access only" });
  }
  console.log("move on");

  next();
};
