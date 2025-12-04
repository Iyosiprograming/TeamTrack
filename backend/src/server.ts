import express from "express";
import ownerRouter from "./routes/ownerRouter.js";
import employeRouter from "./routes/employeRouter.js";
import connectDB from "./config/dbConnect.js";

const app = express();

app.use(express.json());
app.use("/api/owner", ownerRouter);
app.use("/api/employe", employeRouter)
const PORT = process.env.PORT || 3000
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("error on the server")
    }
}

startServer()