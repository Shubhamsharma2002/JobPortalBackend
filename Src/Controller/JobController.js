import express from "express";
import { Job } from "../Models/jobMdel.js";
import { User } from "../Models/userModel.js";

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
         const jobs = await Job.find(query)
         .populate({path:"company"})
         .sort({createdAt:-1});

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
// export const getAdminJobs = async (req, res) => {
//     try {
//       const adminId = req.id;
  
//       // Find the admin by ID
//       const admin = await User.findById({_id:adminId});
//       if (!admin) {
//         return res.status(404).json({
//           message: `Admin with ID ${adminId} not found`,
//           success: false,
//         });
//       }
  
//       // Find jobs created by the admin
//       const jobs = await Job.find({ created_by: adminId });
  
//       // Check if there are no jobs
//       if (jobs.length === 0) {
//         return res.status(404).json({
//           message: `No jobs found for admin ${admin.name}`,
//           success: false,
//         });
//       }
  
//       // Return jobs with success message
//       return res.status(200).json({
//         jobs,
//         message: `Posted Jobs by ${admin.name}`,
//         success: true,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         message: "An error occurred while fetching jobs",
//         success: false,
//       });
//     }
//   };
  
export const getAdminJobs = async(req,res)=>{
      try {
          const adminId = req.id;
          const admin = await User.findById(adminId);

          const jobs = await Job.find({created_by:adminId});
          if (jobs.length === 0) {
            return res.status(404).json({
              message: `No jobs found for admin ${admin.name}`,
              success: false,
            });
          }
        
         return res.status(200).json({
            jobs,
            message:`Posted Jobs Are by ${admin.name}`,
            success:false
        });

      } catch (error) {
        console.log(error);
        
      }
} 