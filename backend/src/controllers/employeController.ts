import { Request, Response } from "express";
import employeModel from "../models/employeModel.js";
import teamModel from "../models/teamModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// date calculatoer
const checkTodayDate = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return `${year}-${month}-${day}`
}

// employe login
export const loginEmploye = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const employe = await employeModel.findOne({ email })
        if (!employe) {
            return res.status(400).json({ message: "🛑Employe not found" })
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
        return res.status(200).json({ message: "🥳Employe logged in successfully" })
    }
    catch (error: any) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
// get personal profile
export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params
    const employe = await employeModel.findById(id)
    if (!employe) {
        return res.status(404).json({ message: "🛑Employe not found" })
    }
    return res.status(200).json({ message: "🥳Employe profile retrieved successfully", employe })
}
// updaet profile
export const updateEmployeProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "🛑Unauthorized: User not found in token" });
        }

        const userId = req.user.id;

        const allowedFields = ["email", "phone", "password"];
        const updates: any = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        // Hash password only if provided
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedEmployee = await employeModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "🛑Employee not found" });
        }

        return res.status(200).json({
            message: "🥳Profile updated successfully",
            employee: updatedEmployee
        });

    } catch (error: any) {
        console.error("Update error:", error); // shows real error in console
        return res.status(500).json({
            message: "🛑Server error",
            error: error.message || error
        });
    }
};
// attendace 
export const attendance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await employeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "🛑Employee not found" });
        }

        const today = checkTodayDate();

        if (employee.presentdays.includes(today)) {
            return res.status(400).json({ message: "🛑Employee already marked attendance" });
        }

        employee.presentdays.push(today);
        await employee.save();

        return res.status(200).json({ message: "🥳Attendance marked successfully" });
    } catch (error: any) {
        console.error("Attendance Error:", error);
        return res.status(500).json({ message: "🛑Internal server error", error: error.message });
    }
};
// Get Team Ur On
export const getMyTeam = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const employee = await employeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "🛑Employee not found" });
        }

        const teams = await teamModel.find({ members: employee._id })
            .populate({
                path: "members",
                select: "-password"
            });

        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: "🛑No team found for this employee" });
        }

        return res.status(200).json({
            message: "🥳Team(s) retrieved successfully",
            teams
        });

    } catch (error: any) {
        console.error("Get team data error:", error);
        return res.status(500).json({ message: "🛑Internal server error", error: error.message });
    }
};

