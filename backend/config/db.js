import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error(
      "Make sure MongoDB is running locally or update MONGO_URI in backend/.env with your MongoDB Atlas URI"
    );
  }
};

export default connectDB;
