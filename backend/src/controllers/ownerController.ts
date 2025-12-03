import type { Request, Response } from "express";
import ownerModel from "../models/ownerModel.js";
import bcrypt from "bcrypt";

// create owner

export const createOwner = async (req: Request, res: Response) => {
    try {
        const { name, email, password, passcode } = req.body
        const existingOwner = await ownerModel.findOne({})
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const owner = await ownerModel.create({
            name,
            email,
            password: hashedPassword,
            passcode
        })
        res.status(200).json({
            message: "Owner created successfully",
            owner
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
};