import { employeModel } from "../models/employeModel.js";
import { sickLeaveModel } from "../models/sickleaveModel.js";
import { teamModel } from "../models/teamModel.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_in_production";

// Helper: Validate ObjectId
const validateObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// =========================
// LOGIN EMPLOYEE
// =========================
const loginEmploye = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }

        // Sanitize input (basic)
        const sanitizedEmail = email.trim().toLowerCase();

        const existingEmploye = await employeModel.findOne({ email: sanitizedEmail });
        if (!existingEmploye) {
            return res.status(400).json({ message: "No Employee Found", success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingEmploye.password as string);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password", success: false });
        }

        const token = jwt.sign(
            { employeId: existingEmploye._id, email: existingEmploye.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: `Welcome ${existingEmploye.name} 👋`,
            token,
            success: true,
            user: { id: existingEmploye._id, name: existingEmploye.name, email: existingEmploye.email }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while logging in employee", success: false });
    }
};

// =========================
// SEE PROFILE
// =========================
const seeProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Employee ID", success: false });
        }

        const existingEmploye = await employeModel.findById(id).select("-password");
        if (!existingEmploye) {
            return res.status(404).json({ message: "No Employee Found", success: false });
        }

        return res.status(200).json({ message: "Employee Found", success: true, user: existingEmploye });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching profile", success: false });
    }
};

// =========================
// UPDATE PROFILE (password only)
// =========================
const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Employee ID", success: false });
        }

        const existingEmploye = await employeModel.findById(id);
        if (!existingEmploye) {
            return res.status(404).json({ message: "No Employee Found", success: false });
        }

        const { password, oldPassword } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Only password can be updated through this endpoint", success: false });
        }

        if (!oldPassword) {
            return res.status(400).json({ message: "Old password is required to update password", success: false });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, existingEmploye.password as string);
        if (!isOldPasswordValid) {
            return res.status(400).json({ message: "Old password is incorrect", success: false });
        }

        existingEmploye.password = await bcrypt.hash(password, 10);
        await existingEmploye.save();

        return res.status(200).json({ message: "Password updated successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while updating profile", success: false });
    }
};

// =========================
// APPLY FOR SICK LEAVE
// =========================
const applyforsickLeave = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, reason } = req.body;

        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Employee ID", success: false });
        }

        if (!startDate || !endDate || !reason) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingEmploye = await employeModel.findById(id);
        if (!existingEmploye) {
            return res.status(404).json({ message: "No Employee Found", success: false });
        }

        const sickLeave = await sickLeaveModel.create({
            employeeId: existingEmploye._id,
            employeeName: existingEmploye.name,
            startDate,
            endDate,
            reason,
            status: "Pending",
            appliedDate: new Date()
        });

        return res.status(201).json({ message: "Sick Leave Applied Successfully", success: true, sickLeave });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while applying for sick leave", success: false });
    }
};

// =========================
// SEE TEAM
// =========================
const seeTeam = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Employee ID", success: false });
        }

        const existingEmploye = await employeModel.findById(id);
        if (!existingEmploye) {
            return res.status(404).json({ message: "No Employee Found", success: false });
        }

        const team = await teamModel.findById(existingEmploye.teamId).select("name members");
        return res.status(200).json({ message: "Team Found", success: true, team });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching team", success: false });
    }
};

export { loginEmploye, seeProfile, updateProfile, applyforsickLeave, seeTeam };
