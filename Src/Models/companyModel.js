import mongoose from "mongoose";
// / compzny schema
const companySchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
    unique:true
   },
   description:{
    type:String,
    
   },
   website:{
    type:String,
    
   },
   logo:{
    type:String,  //url by cloudniary
    
   },
   userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true
   }
    
 },{timestamps:true});

export const Company = mongoose.model("Company", companySchema);