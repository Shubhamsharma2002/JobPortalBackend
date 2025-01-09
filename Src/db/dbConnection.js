import mongoose from "mongoose";
// connectic to db function 
const connectDB = async () => {
  try {
    // printing the connection string
    console.log(`${process.env.URI}`);

    const connection = await mongoose.connect(
      `${process.env.URI}/${process.env.DB_NAME}`
    );
    // connection msh
    console.log(`databse connect ::)  ${connection}`);
  } catch (error) {
    console.log("mongo db connection error");
    console.log(error);
  }
};

export default connectDB;
