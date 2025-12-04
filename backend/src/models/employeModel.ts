import mongoose from "mongoose";

const employeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requiredd: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tempPassword: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        default: "Fullstack"
    },
    contrat: {
        type: String,
        enum: ["Fulltime", "Part-time", "Contract"],
        default: "Fulltime"
    },
    salary: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    reason: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    createDate: {
        type: Date,
        default: Date.now
    }

})

export const employeModel = mongoose.model("Employe", employeSchema)