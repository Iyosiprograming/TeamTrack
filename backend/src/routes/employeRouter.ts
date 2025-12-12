import {
    loginEmploye,
    updateEmployeProfile,
    attendance,
    getMyTeam
} from "../controllers/employeController.js";
import express from "express"
const employeRouter = express.Router();
// employe routes
employeRouter.post("/login", loginEmploye);
employeRouter.put("/updateprofile", updateEmployeProfile);
employeRouter.put("/attendance/:id", attendance);
employeRouter.get("/myteam/:id", getMyTeam);
export default employeRouter