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
        required: true,
        default: "Fullstack"
      },
    salary: {
        type: Number,
        required: true

    },
    presentdays: {
        type: [String],
        default: []
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("Employe", employeModel)
