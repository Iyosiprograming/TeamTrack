import { Request, Response } from "express";
import employeModel from "../models/employeModel.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// employe login
export const loginEmploye = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (email || password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const employe = await employeModel.findOne({ email })
    if (!employe) {
        return res.status(400).json({ message: "Employe not found" })
    }
    const isPasswordValid = await bcrypt.compare(password, employe.password)
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ id: employe._id, email: employe.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" })
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000
    })
    return res.status(200).json({ message: "Employe logged in successfully" })
}

// updaet profile
export const updateEmployeProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        const allowedFields = ["email", "phone", "password"];
        const updates: any = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedEmployee = await employeModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            employee: updatedEmployee
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

