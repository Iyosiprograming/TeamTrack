import express from "express";
import {
    loginEmploye,
    updateEmployeProfile,
    attendance,
    getMyTeam
} from "../controllers/employeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { loginLimiter } from "../middlewares/ratelimitingMiddleware.js";
const employeRouter = express.Router();

employeRouter.post("/login", loginLimiter, loginEmploye);

employeRouter.use(verifyToken);

employeRouter.put("/updateprofile", updateEmployeProfile);
employeRouter.put("/attendance/:id", attendance);
employeRouter.get("/myteam/:id", getMyTeam);

export default employeRouter;
