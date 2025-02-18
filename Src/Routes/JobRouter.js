import express from "express";

import jwtAuth from "../Middleware/jwtAuthMiddleware.js";
import { getAdminJobs, getAlljob, getJobbyId, postJobs } from "../Controller/JobController.js";

const jobRouter = express.Router();
// jobs routes
jobRouter.route("/post-Jobs").post(postJobs);
jobRouter.route("/get-Alljobs").post(getAlljob);
jobRouter.route("/get-jobById").get(getJobbyId);
// geting job on only admin dashboard
jobRouter.route("/get-jobByadmin").get(getAdminJobs);
// test routes
jobRouter.route("/check").get((req,res)=>{
    const data = {
        message: "Hello, this is a JSON response by job routes"
    };
    res.json(data); // Sends a JSON response
})


export default jobRouter;