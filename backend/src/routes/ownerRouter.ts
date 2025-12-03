import express from "express";
import { createOwner } from "../controllers/ownerController.js";

const router = express.Router();

router.post("/create", createOwner)

export default router
