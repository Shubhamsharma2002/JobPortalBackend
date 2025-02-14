import express from "express";
import userRouter from "./auth/userRouter.js";
import companyRouter from "./CompanyRouter.js";

const router = express.Router();


router.use("/user",userRouter)
router.use("/comapny",companyRouter)
export default router;