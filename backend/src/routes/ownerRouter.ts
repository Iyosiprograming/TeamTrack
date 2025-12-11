import {
    createOwner,
    loginOwner,
    createEmploye
} from "../controllers/ownerController.js"
import express from "express";
const router = express.Router();

// owner routes
router.post("/create", createOwner)
router.post("/login", loginOwner)
// create employe
router.post("/createEmploye", createEmploye)

export default router