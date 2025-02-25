import express from "express";

import jwtAuth from "../Middleware/jwtAuthMiddleware.js";
import { ApiResponse } from "../utils/Apiresponse.js";


const applicationRouter = express.Router();


applicationRouter.route("/check").get((req,res)=>{
    const data = {
        name: "test dev",
        email:"teastemail@gmail.com"
    };
    return res.status(200).json(
        new ApiResponse(200, data,"Hello, this is a JSON response by application routes")
     )
})

export default applicationRouter;

// linkdin activation coachs
// https://go.growthschool.io/li-5d-generic?utm_source=google&utm_medium=pmax&utm_campaign=04112024-PMAX-Linkedin-Prospecting-1-DS-WS-5D-IND-Vaibhav-Tier2Cities&utm_content=assetgroup&utm_term=&creative=&device=c&placement=&gad_source=2&gclid=CjwKCAiAzvC9BhADEiwAEhtlN2erQv_p7xbqy7kRXDrCwC9br-Cc4EHfoMeYQl65v9mWMvbVMoRRfxoCdDUQAvD_BwE