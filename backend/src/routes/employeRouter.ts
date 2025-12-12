import {
    loginEmploye,
    updateEmployeProfile,
    attendance
} from "../controllers/employeController.js";
import express from "express"
const employeRouter = express.Router();
// employe routes
employeRouter.post("/login", loginEmploye);
employeRouter.put("/updateprofile", updateEmployeProfile);
employeRouter.put("/attendance/:id", attendance);

export default employeRouter