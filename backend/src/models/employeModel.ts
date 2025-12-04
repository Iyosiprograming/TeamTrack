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

    age: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        enum: ["Frontend", "Backend", "Fullstack", "UI designer"],
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
    sickLeave: {
        type: Number,
        default: 0
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
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    createDate: {
        type: Date,
        default: Date.now
    }

})

export const employeModel = mongoose.model("Employe", employeSchema)