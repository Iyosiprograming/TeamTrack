import { Request, Response } from "express";
import ownerModel from "../models/ownerModel.js";
import employeModel from "../models/employeModel.js";
import teamModel from "../models/teamModel.js";
import crypto from "crypto"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const generatePassword = (): string => {
    return crypto.randomInt(100000, 999999).toString();
};

// Create owner/admin
export const createOwner = async (req: Request, res: Response) => {
    try {
        const { name, email, password, passcode } = req.body;

        const existingOwner = await ownerModel.findOne({});
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        // Hash password and passcode
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPasscode = await bcrypt.hash(passcode, 10);

        const newOwner = new ownerModel({
            name,
            email,
            password: hashedPassword,
            passcode: hashedPasscode
        });

        await newOwner.save();

        return res.status(200).json({ message: "Owner created successfully", owner: newOwner });
    } catch (error) {
        console.error("Create Owner Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// login owner/admin
export const loginOwner = async (req: Request, res: Response) => {
    try {
        const { email, password, passcode } = req.body;

        const owner = await ownerModel.findOne({ email });
        if (!owner) {
            return res.status(400).json({ message: "Owner33 not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, owner.password);
        const isPasscodeValid = await bcrypt.compare(passcode, owner.passcode);

        if (!isPasswordValid || !isPasscodeValid) {
            return res.status(400).json(
                {
                    message: "Invalid credentials"
                }
            );
        }

        // Create JWT
        const token = jwt.sign(
            { id: owner._id, email: owner.email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3600000
        });

        return res.status(200).json({
            message: `Welcome ${owner.name} 👋`,

        });
    } catch (error) {
        console.error("Login Owner Error:", error);
        return res.status(500).json(
            {
                message: "Internal server error"
            }
        );
    }
};

// update admin/owner profile
export const updateProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User not found in token" });
        }

        const userId = req.user.id;

        const allowedFields = ["email", "password", "passcode"];
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

        if (updates.passcode) {
            updates.passcode = await bcrypt.hash(updates.passcode, 10);
        }

        const updatedOwner = await ownerModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        );

        if (!updatedOwner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            owner: updatedOwner
        });

    } catch (error: any) {
        console.error("Update error:", error); // shows real error in console
        return res.status(500).json({
            message: "Server error",
            error: error.message || error
        });
    }
}

// create new employe
export const createEmploye = async (req: Request, res: Response) => {
    try {
        const { name, email, age, gender, phone, role, salary } = req.body;

        if (!name || !email || !age || !gender || !phone || !role || !salary) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingEmploye = await employeModel.findOne({ email });
        if (existingEmploye) {
            return res.status(400).json({ message: "Employee already exists" });
        }

        // Generate a temporary password
        const tempPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const newEmploye = new employeModel({
            name,
            email,
            password: hashedPassword,
            tempPassword,
            age,
            gender,
            phone,
            role,
            salary
        });

        newEmploye.save();

        return res.status(200).json({
            message: "Employee created successfully",
            tempPassword
        });
    } catch (error) {
        console.error("Create Employee Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// delete employe
export const deleteEmploye = async (req: Request, res: Response) => {
    try {
        const employeId = req.params.id;

        const deletedEmploye = await employeModel.findByIdAndDelete(employeId);

        if (!deletedEmploye) {
            return res.status(404).json({ message: "Employe not found" });
        }

        return res.status(200).json({
            message: "Employe deleted successfully",
            employe: deletedEmploye
        });

    } catch (error: any) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
// reset password for employe
export const resetEmployeePassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const employee = await employeModel.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const tempPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        employee.password = hashedPassword;

        await employee.save();


        return res.status(200).json({
            message: "Password reset successfully",
            tempPassword
        });

    } catch (error: any) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// create new team
export const createTeam = async (req: Request, res: Response) => {
    try {
        const { name, description, members } = req.body;

        if (!name || !description || !members) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingTeam = await teamModel.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ message: "Team already exists" });
        }

        const newTeam = new teamModel({
            name,
            description,
            members
        });

        newTeam.save();

        return res.status(200).json({
            message: "Team created successfully",
            team: newTeam
        });
    } catch (error) {
        console.error("Create Team Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// update team
export const updateTeam = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.id;

        const updatedTeam = await teamModel.findByIdAndUpdate(
            teamId,
            { $set: req.body },
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        return res.status(200).json({
            message: "Team updated successfully",
            team: updatedTeam
        });

    } catch (error: any) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// delete team
export const deleteTeam = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.id;

        const deletedTeam = await teamModel.findByIdAndDelete(teamId);

        if (!deletedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        return res.status(200).json({
            message: "Team deleted successfully",
            team: deletedTeam
        });

    } catch (error: any) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
