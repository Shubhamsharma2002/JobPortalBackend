import express from "express";

import jwtAuth from "../Middleware/jwtAuthMiddleware.js";


const applicationRouter = express.Router();


applicationRouter.route("/check").get((req,res)=>{
    const data = {
        message: "Hello, this is a JSON response by application routes"
    };
    res.json(data); // Sends a JSON response
})

export default applicationRouter;