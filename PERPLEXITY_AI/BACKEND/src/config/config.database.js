import "dotenv/config";
import { connect } from "mongoose";

const connectToDB = async () => {
  try {
    const DB = await connect(process.env.MONGO_URI);
    console.log(`DB conneted successfully. ${DB.connection.host}`);
  } catch (error) {
    console.log(`DB connection faild - ${error}`);
  }
};

export default connectToDB;
