import { Company } from "../Models/companyModel.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyname } = req.body;
    if (!companyname) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyname });
    if (company) {
      return res.status(400).json({
        message: "Name alredy register with other orgnization",
        success: false,
      });
    }

    const res = await Company.create({
      name: companyname,
      userId: req.id,
    });

    return res.status(201).json({
      res,
      message: "comapny created sucessfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "No any company found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const comanyId = req.params.id;
    const company = await Company.findById(comanyId);
    if (!company) {
      return res.status(400).json({
        message: "No any company found",
        success: false,
      });
    }
    return res.status(200).json({
       company,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
