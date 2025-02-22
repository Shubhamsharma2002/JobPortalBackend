import {Application} from '../Models/applicationModel.js'
import { Job } from '../Models/jobMdel.js';
export const applyjobs = async(req , res)=>{
//    require data from body
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "job id is required",
                success: false,
              });
        }
        const exsitingApplication = await Application.findOne({job:jobId, application:userId});
        if(exsitingApplication){
            return res.status(400).json({
                message: "you alredy applied for this job",
                success: false,
              });
        }
        const job = await Job.findById(jobId);
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

export const getAppliecJob = async(req,res)=>{
      try {
          const userId = req.id;
          const apliedJob = await Application.find({application:userId})
          .sort({createdAt:-1})
          .populate({
            path:'Job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'Company',
                options:{sort:{createdAt:-1}},
            }
          })
          if(!apliedJob){
            return res.status(404).json({
                message:"No Application",
                success:false
            })
          }
          return res.status(20).json({
            message:"Applied job are",
            apliedJob,
            success:true
        })
      } catch (error) {
        console.log(error);
        
      }
}