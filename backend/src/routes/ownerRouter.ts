import express from "express";
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

const router = express.Router();

router.post("/create", createOwner);
router.post("/login", loginLimiter, loginOwner);

router.use(verifyToken);

router.put("/updateProfile", updateProfile);
router.post("/createEmploye", createEmploye);
router.put("/resetPassword", resetEmployeePassword);
router.delete("/deleteEmploye/:id", deleteEmploye);
router.post("/createTeam", createTeam);
router.put("/updateTeam/:id", updateTeam);
router.delete("/deleteTeam/:id", deleteTeam);
router.get("/getAllEmployes", getAllEmployes);
router.get("/getAllTeams", getAllTeams);
router.get("/getSingleEmploye/:name", getSingleEmploye);

export default router;
