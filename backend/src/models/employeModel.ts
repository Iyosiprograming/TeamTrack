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
        requred: true
    },
    gender: {
        enum: ["Male", "Female"],
        requred: true
    },
    phone: {
        type: String,
        requred: true
    },
    // work info
    role: {
        type: String,
        enum: ["Frontend", "Backend", "Fullstack"],
        default: "Frontend"
    },
    salary: {
        type: Number,
        requred: true
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
