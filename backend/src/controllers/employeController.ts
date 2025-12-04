import { employeModel } from "../models/employeModel.js"
import { sickLeaveModel } from "../models/sickleaveModel.js"
import { teamModel } from "../models/teamModel.js"
import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_in_production"

// Login Employe
const loginEmploye = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            })
        }

        const existingEmploye = await employeModel.findOne({ email })

        if (!existingEmploye) {
            return res.status(400).json({
                message: "No Employe Found",
                success: false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingEmploye.password as string)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid password",
                success: false
            })
        }

        const token = jwt.sign(
            {
                employeId: existingEmploye._id,
                email: existingEmploye.email
            },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        )

        return res.status(200).json({
            message: `Welcome ${existingEmploye.name}👋`,
            token,
            success: true,
            user: {
                id: existingEmploye._id,
                name: existingEmploye.name,
                email: existingEmploye.email
            }
        })

    } catch (error) {
        console.error("Server Error:", error)
        return res.status(500).json({
            message: "Error on server while logging in employe",
            success: false
        })
    }
}
// see profile profile
const seeProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const existingEmploye = await employeModel.findById(id)
        if (!existingEmploye) {
            return res.status(400).json({
                message: "No Employe Found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Employe Found",
            success: true,
            user: existingEmploye
        })
    } catch (error) {
        console.error("Server Error:", error)
        return res.status(500).json({
            message: "Error on server while logging in employe",
            success: false
        })
    }
}
// update profile
const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Employee ID is required",
                success: false
            })
        }

        const existingEmploye = await employeModel.findById(id)

        if (!existingEmploye) {
            return res.status(404).json({
                message: "No Employee Found",
                success: false
            })
        }

        const { password, oldPassword } = req.body

        if (password) {
            if (!oldPassword) {
                return res.status(400).json({
                    message: "Old password is required to update password",
                    success: false
                })
            }

            const isOldPasswordValid = await bcrypt.compare(
                oldPassword,
                existingEmploye.password as string
            )

            if (!isOldPasswordValid) {
                return res.status(400).json({
                    message: "Old password is incorrect",
                    success: false
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            existingEmploye.password = hashedPassword

            await existingEmploye.save()

            return res.status(200).json({
                message: "Password updated successfully",
                success: true
            })
        } else {
            return res.status(400).json({
                message: "Only password can be updated through this endpoint",
                success: false
            })
        }

    } catch (error) {
        console.error("Server Error:", error)
        return res.status(500).json({
            message: "Error on server while updating profile",
            success: false
        })
    }
}

// apply for Sick Leave
const applyforsickLeave = async (req: Request, res: Response) => {
    const { id } = req.params
    const existingEmploye = await employeModel.findById(id)
    if (!existingEmploye) {
        return res.status(404).json({
            message: "No Employee Found",
            success: false
        })
    }
    const { startDate, endDate, reason } = req.body
    const sickLeave = await new sickLeaveModel({
        employeeId: existingEmploye._id,
        employeeName: existingEmploye.name,
        startDate,
        endDate,
        reason,
        status: "Pending",
        appliedDate: Date.now(),
    })
    return res.status(200).json({
        message: "Sick Leave Applied Successfully",
        success: true,
        sickLeave
    })
}

// see the team the user is on
const seeTeam = async (req: Request, res: Response) => {
    const { id } = req.params
    const existingEmploye = await employeModel.findById(id)
    if (!existingEmploye) {
        return res.status(404).json({
            message: "No Employee Found",
            success: false
        })
    }
    const team = await teamModel.findById(existingEmploye)
    return res.status(200).json({
        message: "Team Found",
        success: true,
        team
    })
}

export { loginEmploye, seeProfile, updateProfile, applyforsickLeave, seeTeam }