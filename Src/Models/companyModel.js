import mongoose from "mongoose";

const companySchema = new mongoose.Schema({ });

export const Company = mongoose.model("Company", companySchema);