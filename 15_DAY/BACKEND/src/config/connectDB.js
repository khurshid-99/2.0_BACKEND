const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected successfully `);
  } catch (error) {
    console.log(`DB connection is faild ${error} `);
  }
};

module.exports = connectToDB;
