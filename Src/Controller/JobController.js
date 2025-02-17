import e from "express";
import { Job } from "../Models/jobMdel.js";

export const postJobs = async(req , res)=>{
      try {
            const {title,description,requirments,salary ,experinceLevel,location,jobType,position,companyId} = req.body;
            const userId = req.id;

            if(!title || !description || !requirments || !salary ||!experinceLevel|| !location || !jobType || !position || !companyId){
                return res.status(400).json({
                    message:"All filed are required",
                    success:false
                });
            }
            const job = await Job.create({
                title,
                description,
                requirments : requirments.split(" , "),
                salary : Number(salary),
                experinceLevel,
                location,
                jobType,
                position,
                company :companyId,
                created_by:userId
            })

            return res.status(201).json({
                job,
                message:"New job Created sucessfully",
                success:true
            })

      } catch (error) {
        console.log(error);
        
      }
}

export const getAlljob = async(req,res)=>{
    try {
         const keywords = req.query.keywords || "";
         const query = {
            $or:[
                {title:{$regex:keywords,$options:'i'}},
                {description:{$regex:keywords,$options:'i'}}
            ]
         }
         const jobs = await Job.find(query);

         if(!jobs){
            return res.status(404).json({
                message:"Job Not Found",
                success:false
            });
         }
         return res.status(200).json({
            jobs,
            message:"Related Jobs Are",
            success:false
        });
    } catch (error) {
        console.log(error);
        
    }
}

export const getJobbyId = async(req,res)=>{
     try {
        const JobId = req.params.id;
        const job = await Job.findById(JobId);
        if(!job){
            return res.status(404).json({
                message:"Job Not Found",
                success:false
            });
         }
         return res.status(200).json({
            job,
            message:"Jobs Found",
            success:false
        });
     } catch (error) {
        console.log(error);
        
     }
}

export const getAdminJobs = async(req,res)=>{
      try {
          const adminId = req.id;
          const jobs = await Job.find({created_by:adminId});
          if(!jobs){
            return res.status(404).json({
                message:`No any jobs created by ${adminId.name}`,
                success:false
            });
         }
         return res.status(200).json({
            jobs,
            message:"Posted Jobs Are",
            success:false
        });

      } catch (error) {
        console.log(error);
        
      }
} 