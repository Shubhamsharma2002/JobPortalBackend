import express from "express";

import jwtAuth from "../Middleware/jwtAuthMiddleware.js";
import { getAdminJobs, getAlljob, getJobbyId, postJobs } from "../Controller/JobController.js";

const jobRouter = express.Router();
// jobs routes
jobRouter.route("/post-Jobs").post(jwtAuth,postJobs);
jobRouter.route("/get-Alljobs").get(jwtAuth,getAlljob);
jobRouter.route("/get-jobById/:id").get(jwtAuth,getJobbyId);
// geting job on only admin dashboard
jobRouter.route("/get-jobByadmin").get(jwtAuth,getAdminJobs);
// test routes
jobRouter.route("/check").get((req,res)=>{
    const data = {
        name: "abcin",
        email:"teastemail@gmail.com"
    };
    return res.status(200).json(
        new ApiResponse(200, data,"Hello, this is a JSON response by job routes")
     )
})


export default jobRouter;