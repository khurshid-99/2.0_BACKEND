const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected successfully `);
  } catch (error) {
    console.log(`DB connection faild ${error} `);
  }
}


module.exports = connectToDB;   