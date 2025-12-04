import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    loginEmploye,
    seeProfile,
    updateProfile,
    applyforsickLeave,
    seeTeam
} from "../controllers/employeController.js";

const router = express.Router()

// Login Employe
router.post("/login", loginEmploye)

// See Profile
router.get("/profile/:id", authMiddleware, seeProfile)

// Update Profile
router.put("/profile/:id", authMiddleware, updateProfile)

// Apply for Sick Leave
router.post("/sick-leave/:id", authMiddleware, applyforsickLeave)

// See Team
router.get("/team/:id", authMiddleware, seeTeam)

export default router