import {
    loginEmploye,
    updateEmployeProfile
} from "../controllers/employeController.js";
import express from "express"
const employeRouter = express.Router();
// employe routes
employeRouter.post("/login", loginEmploye);
employeRouter.put("/updateprofile", updateEmployeProfile);

export default employeRouter