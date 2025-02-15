import { Company } from "../Models/companyModel.js";
// register company
export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: name });
    if (company) {
      return res.status(400).json({
        message: "Name alredy register with other orgnization",
        success: false,
      });
    }

    const result = await Company.create({
      name: name,
      userId: req.id,
    });

    return res.status(201).json({
        result,
      message: "comapny created sucessfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get the company details
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
    return res.status(200).json({
        message: "company found",
        companies,
        success: false,
      });
  } catch (error) {
    console.log(error);
  }
};

// by id search 
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

export const updateCompany = async(req,res)=>{
    try {
         const {name,description, website} = req.body;
         const file = req.file;

         const updatedata = {name,description,website};
         const comapny = await Company.findByIdAndUpdate(req.params.id, updatedata , {new:true});
        //  console.log(req.params.id)
         return res.status(500).json({
            message: "company data updated sucessfully",
            comapny,
            success: false,
          });
    } catch (error) {
        console.log(error);
    }
}