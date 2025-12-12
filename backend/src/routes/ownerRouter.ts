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
    getAllTeams
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
// reset password for employe
router.put("/resetPassword", resetEmployeePassword)
// delete employe
router.delete("/deleteEmploye/:id", deleteEmploye)
// create team
router.post("/createTeam", createTeam)
// update team
router.put("/updateTeam/:id", updateTeam)
// delete team
router.delete("/deleteTeam/:id", deleteTeam)
// get all employes
router.get("/getAllEmployes", getAllEmployes)
// get all teams
router.get("/getAllTeams", getAllTeams)
export default router