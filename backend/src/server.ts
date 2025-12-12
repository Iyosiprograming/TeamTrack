import express from "express";
import owner from "./routes/ownerRouter.js"
import employe from "./routes/employeRouter.js"
import connectDB from "./config/dbConfig.js"

const app = express();

app.use(express.json());

app.use("/api/owner", owner);
app.use("/api/employe", employe);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()