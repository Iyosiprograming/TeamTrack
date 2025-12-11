import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const URI = "mongodb://127.0.0.1:27017/teamtrack"
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string || URI)
        console.log("MongoDB connected 🟩")
    } catch (error) {
        console.log("Server error 🛑")
        process.exit(1)
    }
}
export default connectDB