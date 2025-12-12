import {
    createOwner,
    loginOwner,
    createEmploye,
    createTeam,
    updateProfile,
    updateTeam,
    deleteTeam
} from "../controllers/ownerController.js"
import express from "express";
const router = express.Router();

// owner routes
router.post("/create", createOwner)
router.post("/login", loginOwner)
// update profile
router.put("/updateProfile", updateProfile)
// create employe  
router.post("/createEmploye", createEmploye)
// create team
router.post("/createTeam", createTeam)
// update team
router.put("/updateTeam/:id", updateTeam)
// delete team
router.delete("/deleteTeam/:id", deleteTeam)

export default router