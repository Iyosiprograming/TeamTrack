import mongoose from "mongoose";

const employeModel = new mongoose.Schema({
    // user credential
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // user info
    age: {
        type: Number,
        required: true

    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true

    },
    phone: {
        type: String,
        required: true

    },
    // work info
    role: {
        type: String,
        enum: ["Frontend", "Backend", "Fullstack"],
        default: "Frontend"
    },
    salary: {
        type: Number,
        required: true

    },
    absentdays: {
        type: Number,
        default: 0
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("Employe", employeModel)
