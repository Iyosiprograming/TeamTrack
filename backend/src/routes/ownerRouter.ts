import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    createOwner,
    loginOwner,
    getAllEmployee,
    createEmploye,
    deleteTeam,
    createTeam,
    updateTeam,
    declineSickLeave,
    acceptSickLeave,
    getAllSickLeave
} from "../controllers/ownerController.js";

const router = express.Router();

// =========================
// OPEN ROUTES (no auth, no rate limit)
// =========================
router.post("/create", createOwner);
router.post("/login", loginOwner);

// PROTECTED ROUTES 
router.use(authMiddleware);       

// Employee routes
router.get("/employees", getAllEmployee);
router.post("create",createEmploye)

// Sick leave routes
router.get("/sickleave", getAllSickLeave);
router.put("/sickleave/approve/:id", acceptSickLeave);
router.put("/sickleave/reject/:id", declineSickLeave);

// Team routes
router.post("/teams", createTeam);
router.put("/teams/:id", updateTeam);
router.delete("/teams/:id", deleteTeam);

export default router;
