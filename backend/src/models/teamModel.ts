import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employe"
        }
    ]
});

teamSchema.path("members").validate(function (value) {
    return value.length >= 2;
}, "A team must have at least 2 members");

const teamModel = mongoose.model("Team", teamSchema);
export default teamModel;
