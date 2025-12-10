import { Request, Response } from "express";
import ownerModel from "../models/ownerModel.js";
import employeModel from "../models/employeModel.js";
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
            return res.status(400).json({ message: "Owner not found" });
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
