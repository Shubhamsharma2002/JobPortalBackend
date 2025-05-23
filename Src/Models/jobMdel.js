import mongoose from "mongoose";
// job schema
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirments: [String],
    salary:{
        type:Number,
        required:true
    },
    experinceLevel:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
         type:Number,
         required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[
         {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
         }
    ]
},
 {
    timestamps: true,
  }
)
// job model done here 

export const Job = mongoose.model("Job", jobSchema);