import mongoose from "mongoose";

const employeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },

    age: {
        type: Number,
        require: true
    },

    role: {
        type: String,
        enum: ["Frontend", "Backend", "Fullstack", "UI designer"],
        default: "Fullstack"
    },
    contrat: {
        enum: ["Full-time", "Part-time", "Contract"],
        default: "Full-time"
    },
    salary: {
        type: Number,
        require: true
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
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    createDate: {
        type: Date,
        default: Date.now()
    }

})

export const employeModel = mongoose.model("Employe", employeSchema)