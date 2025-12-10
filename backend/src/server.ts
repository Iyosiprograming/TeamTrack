import express from "express";
import owner from "./routes/ownerRouter.js"

const app = express();

app.use(express.json());

app.use("/api/owner", owner);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await /* connectDB() */
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()