import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role:{
      type:String,
      enum:['Student','Requriter'],
      required:true
    },
    profile:{
      bio:{type:String},
      skills:[{type:String}],
      resume:{type:String},
      resumeOriginalName:{type:String},
      company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
      profilePhoto:{
        type:String,
        default:""
      }
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
