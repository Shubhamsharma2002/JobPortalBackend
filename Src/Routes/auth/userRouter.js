import express from "express";
import { login, logout, reqgister, resetPassword, updateProfile } from "../../Controller/UserController.js";
import jwtAuth from "../../Middleware/jwtAuthMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(reqgister)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(logout)
userRouter.route("/profile/updateprofile").patch(jwtAuth, updateProfile)
userRouter.route("/reset-password").post(resetPassword)
// router respons testing dummy route
userRouter.route("/check").get((req,res)=>{
    const data = {
        message: "Hello, this is a JSON response"
    };
    res.json(data); // Sends a JSON response
})

export default userRouter;