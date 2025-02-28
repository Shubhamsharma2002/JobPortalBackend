import {Application} from '../Models/applicationModel.js'
import { Job } from '../Models/jobMdel.js';
export const applyjobs = async(req , res)=>{
//    require data from body
    try {
        const userId = req.id;
        console.log(userId);
        
        const jobId = req.params.id;
        console.log(jobId);
        
        if(!jobId){
            return res.status(400).json({
                message: "job id is required",
                success: false,
              });
        }
        const exsitingApplication = await Application.findOne({job:jobId, application:userId});
        console.log(exsitingApplication);
        
        if(exsitingApplication){
            return res.status(400).json({
                message: "you alredy applied for this job",
                success: false,
              });
        }
        const job = await Job.findById(jobId);
        console.log(job);
        
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }
        const newApplication = await Application.create({
            job:jobId,
            application:userId
        })
        console.log(newApplication);
        
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job Applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAppliedJob = async(req,res)=>{
      try {
          const userId = req.id;
          const apliedJob = await Application.find({application:userId})
          .sort({createdAt:-1})
          .populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
          })
          if(!apliedJob){
            return res.status(404).json({
                message:"No Application",
                success:false
            })
          }
          return res.status(200).json({
            message:"Applied job are",
            apliedJob,
            success:true
        })
      } catch (error) {
        console.log(error);
        
      }
}

// admin purpose

export const getApplication = async(req,res)=>{
    try {
         const jobId = req.params.id;
         const job = await Job.findById(jobId)
         .populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'application'
            }
         })
         if(!job){
            return res.status(404).json({
                message:"No any applicant",
                success:false
            })
         }
         return res.status(200).json({
            message:"Applications are following",
            job,
            success:false
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const updateApplicationStatus = async(req,res)=> {
    
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(400).json({
                message:"Application not Found",
                success:false
            })
        }
        // update status
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated sucseesfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}