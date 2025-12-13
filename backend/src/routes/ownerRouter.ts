import express, { Request, Response } from "express";
import {
  createOwner,
  loginOwner,
  createEmploye,
  createTeam,
  updateProfile,
  updateTeam,
  deleteTeam,
  deleteEmploye,
  resetEmployeePassword,
  getAllEmployes,
  getAllTeams,
  getSingleEmploye
} from "../controllers/ownerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { loginLimiter } from "../middlewares/ratelimitingMiddleware.js";

const ownerRouter = express.Router();

/* ================= PUBLIC ROUTES ================= */
ownerRouter.post("/create", createOwner);
ownerRouter.post("/login", loginLimiter, loginOwner);

/* ================= AUTH CHECK ================= */
ownerRouter.get("/auth/me", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

/* ================= PROTECTED ROUTES ================= */
ownerRouter.use(verifyToken);

// Profile
ownerRouter.put("/updateProfile", updateProfile);

// Employee management
ownerRouter.post("/createEmploye", createEmploye);
ownerRouter.put("/resetPassword", resetEmployeePassword);
ownerRouter.delete("/deleteEmploye/:id", deleteEmploye);
ownerRouter.get("/getAllEmployes", getAllEmployes);
ownerRouter.get("/getSingleEmploye/:name", getSingleEmploye);

// Team management
ownerRouter.post("/createTeam", createTeam);
ownerRouter.put("/updateTeam/:id", updateTeam);
ownerRouter.delete("/deleteTeam/:id", deleteTeam);
ownerRouter.get("/getAllTeams", getAllTeams);

export default ownerRouter;
