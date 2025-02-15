import express from "express";
import userRouter from "./auth/userRouter.js";
import companyRouter from "./CompanyRouter.js";

const router = express.Router();

// authentication routes
router.use("/user",userRouter)
// comapany related routes
router.use("/comapny",companyRouter)
export default router;