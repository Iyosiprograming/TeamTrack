import express from "express";
import { createOwner,loginOwner } from "../controllers/ownerController.js";

const router = express.Router();

router.post("/create", createOwner)

router.post("/login", loginOwner)

export default router
