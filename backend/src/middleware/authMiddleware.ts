import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ownerModel from "../models/ownerModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "Hello world";

// Extend Request type to include owner info
declare module "express-serve-static-core" {
    interface Request {
        owner?: { ownerId: string; email: string };
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET) as { ownerId: string; email: string };

        if (!decoded) {
            return res.status(401).json({ message: "Token is not valid" });
        }

        // Optionally, fetch owner from DB to verify exists
        const owner = await ownerModel.findById(decoded.ownerId);
        if (!owner) {
            return res.status(401).json({ message: "Owner not found" });
        }

        // Attach owner info to request
        req.owner = {
            ownerId: owner._id.toString(),
            email: owner.email
        };

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Authorization failed" });
    }
};
