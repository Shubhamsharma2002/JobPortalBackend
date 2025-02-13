import {User} from '../Models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken"
export const reqgister = async(req,res)=>{
    try {
        const{name,email,phoneNumber,password,role} = req.body;
        if(!name || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"All filed are required",
                success:false
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"Email is alredy registere with another account",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const reg = await User.create({
            name,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        })
        return res.status(201).json({
            reg,
            message:"Registration sucessfully",
            success:true
        })
    } catch (error) {
        console.log("erorr in registartion catch block ", error);
    }
}
export const login = async (req,res) =>{
    try {
           const {email,password,role} = req.body;
           if(!email || !password || !role){
               return res.status(400).json({
                message:"all feild are required",
                success: false
               });

           }

           const validEmail = await User.findOne({email});
           if(!validEmail){
            return res.status(400).json({
                message:"Incorrect email or password",
                success: false
               });
           }
           const ispassword = await bcrypt.compare(password,validEmail.password);
           if(!ispassword){
            return res.status(400).json({
                message:"Incorrect email or password",
                success: false
               });
           }
           if(role != validEmail.role){
            return res.status(400).json({
                message:"Account doenot exist with the specific role",
                success: false
               });
           }
           const loggedInUser = await User.findById(validEmail._id).
           select("-password");
       
           const tokenData = {
            userId : validEmail._id
           }
           const token = await jwt.sign(tokenData,process.env.SECERETE_KEY,{expiresIn:'1d'});

           return res.status(200)
           .cookie("token",token,{maxAge:1*24*60*60*1080, httpsOnly:true,sameSite:'strict'}).
           json({
               message:`welcome back ${validEmail.name}`,
               loggedInUser,
               success:true
           })
    } catch (error) {
       console.log("error in login conroller",error);   
    }
}

export const logout = async (req,res)=>{
      try {
         return res.status(200)
         .cookie("token","",{maxAge:0})
         .json({
             message:"Logout successfully",
             success:true
         })
      } catch (error) {
        console.log("error in logout block", error);
        
      }
}

export const updateProfile = async(req,res)=>{
    // update profile concept is this 

    try {
        const{name,email,phoneNumber,bio,skills} = req.body;
        const file = req.file;
        if(!name || !email || !phoneNumber || !bio  || !skills){
            return res.status(400).json({
             message:"all feild are required",
             success: false
            });
        }
        const skillsArray = skills.split(",");
        const userId = req.id ;
        let user =  await User.findById(userId);

        user.name = name,
        user.email = email,
        user.phoneNumber = phoneNumber,
        user.profile.bio = bio,
        user.profile.skills = skillsArray
        // user.profile.resume = resume
        // user.profile.profilepic = profilepic

        const update_Data = await user.save();
        return res.status(201).json({
            update_Data,
            message:"Profile updated  sucessfully",
            success:true
        })
    } catch (error) {
        
    }
}

export const resetPassword = async(req,res)=>{
    return res.status(201).json({
       
        message:"chill  sucessfully",
        success:true
    })
}