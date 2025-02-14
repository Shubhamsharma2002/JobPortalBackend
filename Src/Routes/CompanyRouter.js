import express from "express";

import jwtAuth from "../Middleware/jwtAuthMiddleware.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../Controller/CompanyController.js";

const companyRouter = express.Router();

companyRouter.route("/registerComapny").post(jwtAuth,registerCompany)
companyRouter.route("/getcompany").get(jwtAuth,getCompany)
companyRouter.route("/getcompanyByid/:id").get(jwtAuth,getCompanyById)
companyRouter.route("/updateCompany/:id").patch(jwtAuth, updateCompany)

// router respons testing dummy route
companyRouter.route("/check").get((req,res)=>{
    const data = {
        message: "Hello, this is a JSON response by company routes"
    };
    res.json(data); // Sends a JSON response
})

export default companyRouter;