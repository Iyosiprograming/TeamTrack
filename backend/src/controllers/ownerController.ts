import type { Request, Response } from "express";
import ownerModel from "../models/ownerModel.js";
import { employeModel } from "../models/employeModel.js";
import { sickLeaveModel } from "../models/sickleaveModel.js";
import { teamModel } from "../models/teamModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Hello world";


// Create Owner
const createOwner = async (req: Request, res: Response) => {
    try {
        const { name, email, password, passcode } = req.body;

        const existingOwner = await ownerModel.findOne({});
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await ownerModel.create({
            name,
            email,
            password: hashedPassword,
            passcode
        });

        return res.status(200).json({
            message: "Owner created successfully",
            owner
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Login Owner
const loginOwner = async (req: Request, res: Response) => {
    try {
        const { email, password, passcode } = req.body;

        const existingOwner = await ownerModel.findOne({ email });

        if (!existingOwner) {
            return res.status(400).json({
                message: "Owner not found",
            });
        }

        if (passcode !== existingOwner.passcode) {
            return res.status(400).json({
                message: "Incorrect passcode",
            });
        }

        const passwordMatch = await bcrypt.compare(password, existingOwner.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        const token = jwt.sign(
            {
                ownerId: existingOwner._id,
                email: existingOwner.email
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: `Welcome ${existingOwner.name} 👋`,
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Get All Employees
const getAllEmployee = async (req: Request, res: Response) => {
    try {
        const allEmployees = await employeModel.find({});

        return res.status(200).json({
            message: "All employees fetched successfully",
            success: true,
            data: allEmployees
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            message: "Error fetching employees",
            success: false
        });
    }
};

// Get All sickLeave Request
const getAllSickLeave = async (req: Request, res: Response) => {
    try {
        const sickLeaves = await sickLeaveModel
            .find({})
            .populate("employeeId", "name email role");

        return res.status(200).json({
            message: "All sick leave requests fetched successfully",
            success: true,
            data: sickLeaves
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            message: "Error fetching sick leave requests",
            success: false
        });
    }
};

// accept sick leave
const acceptSickLeave = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 

        const sickLeave = await sickLeaveModel.findById(id);

        if (!sickLeave) {
            return res.status(404).json({
                message: "Sick leave request not found",
                success: false
            });
        }

        if (sickLeave.status === "Approved") {
            return res.status(400).json({
                message: "This request is already approved",
                success: false
            });
        }

        sickLeave.status = "Approved";
        sickLeave.reviewedDate = new Date();

        await sickLeave.save();

        return res.status(200).json({
            message: "Sick leave approved successfully",
            success: true,
            data: sickLeave
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            message: "Error approving sick leave",
            success: false
        });
    }
};

// decline sick leave
const declineSickLeave = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // sick leave request ID
        const { comments } = req.body; // optional

        const sickLeave = await sickLeaveModel.findById(id);

        if (!sickLeave) {
            return res.status(404).json({
                message: "Sick leave request not found",
                success: false
            });
        }

        if (sickLeave.status === "Rejected") {
            return res.status(400).json({
                message: "This request is already rejected",
                success: false
            });
        }

        sickLeave.status = "Rejected";
        sickLeave.reviewedDate = new Date();
        sickLeave.comments = comments || "Request declined";

        await sickLeave.save();

        return res.status(200).json({
            message: "Sick leave rejected successfully",
            success: true,
            data: sickLeave
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            message: "Error rejecting sick leave",
            success: false
        });
    }
};


// Create Team
const createTeam = async (req: Request, res: Response) => {
    try {
        const { name, employeeIds } = req.body; 

        if (!name || !employeeIds || !Array.isArray(employeeIds)) {
            return res.status(400).json({ message: "Team name and employeeIds array are required" });
        }

        const existing = await teamModel.find({ members: { $in: employeeIds } });
        if (existing.length > 0) {
            return res.status(400).json({
                message: "One or more employees are already assigned to a team"
            });
        }

        const team = await teamModel.create({ name, members: employeeIds });

        return res.status(201).json({
            message: "Team created successfully",
            team
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating team" });
    }
};

// Update Team (add/remove members or rename)
const updateTeam = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, employeeIds } = req.body;

        const team = await teamModel.findById(id);
        if (!team) return res.status(404).json({ message: "Team not found" });

        // Check if new employees are already in another team
        if (employeeIds && employeeIds.length > 0) {
            const existing = await teamModel.find({ members: { $in: employeeIds }, _id: { $ne: id } });
            if (existing.length > 0) {
                return res.status(400).json({
                    message: "One or more employees are already in another team"
                });
            }
            team.members = employeeIds;
        }

        if (name) team.name = name;

        await team.save();

        return res.status(200).json({ message: "Team updated", team });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating team" });
    }
};

// Delete Team
const deleteTeam = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const team = await teamModel.findByIdAndDelete(id);

        if (!team) return res.status(404).json({ message: "Team not found" });

        return res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting team" });
    }
};

export { createOwner, loginOwner, getAllEmployee,deleteTeam,createTeam,updateTeam,declineSickLeave,acceptSickLeave,getAllSickLeave };
