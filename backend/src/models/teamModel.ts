import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // team names are unique
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employe",
            unique: true // ensures employee can appear only once per collection
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const teamModel = mongoose.model("Team", teamSchema);
