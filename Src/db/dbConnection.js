import mongoose from "mongoose";


const connectDB = async () =>{
      try {
        // printing the string
    console.log(`${process.env.URI}`); 
    
       const connection =  await mongoose.connect(`${process.env.URI}/${process.env.DB_NAME}`)
        console.log(`databse connect ::)  ${connection}`);
        
      } catch (error) {
        console.log("mongo db connection error");
        console.log(error);

        
      }
}


export default connectDB;