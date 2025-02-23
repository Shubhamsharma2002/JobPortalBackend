import express from "express";
import userRouter from "./auth/userRouter.js";
import companyRouter from "./CompanyRouter.js";
import jobRouter from "./JobRouter.js";
import applicationRouter from "./ApplicationRoutes.js";

const router = express.Router();

// authentication routes
router.use("/user",userRouter)
// comapany related routes
router.use("/comapny",companyRouter)
// jobs realted routes
router.use("/jobs",jobRouter)
// application related routes
router.use('/application',applicationRouter)
export default router;