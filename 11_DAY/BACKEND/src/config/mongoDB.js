const mongoose = require("mongoose");

const connetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connect successfully");
  } catch (error) {
    console.log(`MongoDb connetion faild Error : ${error}`);
  }
};

module.exports = connetDB