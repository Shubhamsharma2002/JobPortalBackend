import {Company} from '../Models/companyModel.js'

export const registerCompany = async(req,res)=>{
    try {
        const {companyname} = req.body;
        if(!companyname){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }

        let company = await Company.findOne({name:companyname});
        if(company){
            return res.status(400).json({
                message:"Name alredy register with other orgnization",
                success:false
            });
        }

    
      const res = await Company.create({
        name:companyname,
        userId:req.id
      });

      return res.status(201).json({
        res,
        message:"comapny created sucessfully",
        success:true
    });

    } catch (error) {
        
        console.log(error);
        
    }
}