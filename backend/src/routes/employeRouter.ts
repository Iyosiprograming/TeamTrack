import { Request , Response } from "express";
import express from "express";
import {
  loginEmploye,
  updateEmployeProfile,
  attendance,
  getMyTeam,
  getProfile,
} from "../controllers/employeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { loginLimiter } from "../middlewares/ratelimitingMiddleware.js";

const employeRouter = express.Router();

/* ================= PUBLIC ================= */
employeRouter.post("/login", loginLimiter, loginEmploye);

/* ================= AUTH CHECK ================= */
employeRouter.get("/auth/me", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

/* ================= PROTECTED ================= */
employeRouter.use(verifyToken);

employeRouter.get("/getProfile", getProfile);
employeRouter.put("/updateprofile", updateEmployeProfile);
employeRouter.put("/attendance", attendance);
employeRouter.get("/myteam", getMyTeam);

export default employeRouter;
