import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
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
    passcode: {
        type: String,
        required: true
    }
})

const ownerModel = mongoose.model("Owner", ownerSchema)
export default ownerModel