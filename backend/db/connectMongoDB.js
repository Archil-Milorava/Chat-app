import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to database");
  } catch (error) {
    console.log("failed to connect to database", error.message);
  }
};

export default connectDB;
