import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/teamtrack")
        console.log("🟩 db Connected Sucessfully")
    } catch (error) {
        console.log('🛑 db connection error');
        process.exit(1)

    }
}
export default connectDB
