import mongoose from "mongoose";
import config from "../config/index.config.js";

const dbConnect = async () => {
  await mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log(`MongoDB connected. Connection link: ${config.MONGO_URI}`))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default dbConnect;
