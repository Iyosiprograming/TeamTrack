import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // <-- add this
import owner from "./routes/ownerRouter.js";
import employe from "./routes/employeRouter.js";
import connectDB from "./config/dbConfig.js";
import limiter from "./middlewares/ratelimitingMiddleware.js";

const app = express();

// Enable CORS for your frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // <-- add this line
app.use(limiter);

// Routes
app.use("/api/owner", owner);
app.use("/api/employe", employe);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

startServer();
