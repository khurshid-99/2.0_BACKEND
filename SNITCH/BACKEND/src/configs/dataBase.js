import mongoose from "mongoose";
import config from "./config.js";

async function connectToDataBase() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log(`DB connected successfully.`);
  } catch (error) {
    console.log(`DB connection failed!!`);
  }
}

export default connectToDataBase;
