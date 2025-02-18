import express from "express";

import jwtAuth from "../Middleware/jwtAuthMiddleware.js";

const jobRouter = express.Router();



jobRouter.route("/check").get((req,res)=>{
    const data = {
        message: "Hello, this is a JSON response by job routes"
    };
    res.json(data); // Sends a JSON response
})


export default jobRouter;