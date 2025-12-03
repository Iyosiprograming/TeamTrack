import type { Request, Response } from "express";
import ownerModel from "../models/ownerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET || "Hello world"
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

// login owner
export const loginOwner = async (req: Request, res: Response) => {
    const { email, password, passcode } = req.body
    const existingOwner = await ownerModel.findOne({ email })
    if (!existingOwner) {
        return res.status(400).json({
            message: "Ownner not Found",
        })
    }
    if (passcode === existingOwner.passcode) {
        const isPasswordmatch = await bcrypt.compare(password, existingOwner.password)

        if (isPasswordmatch) {
            const token = jwt.sign(
                {
                    ownerId: existingOwner._id,
                    email: existingOwner.email
                },
                JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            );
            res.status(200).json({
                messaeg: `Welcome ${existingOwner.name}👋`,
                token
            })
        }
    }


}