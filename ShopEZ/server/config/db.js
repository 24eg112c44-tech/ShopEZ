import mongoose from "mongoose";

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shopez";
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

export default connectDB;
