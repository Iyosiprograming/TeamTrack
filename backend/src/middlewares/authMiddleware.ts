import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "🛑Unauthorized: Token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "secret", (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: "🛑Forbidden: Invalid token" });
        }

        req.user = decoded;
        next();
    });
};
