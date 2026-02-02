const mongoose = require("mongoose");

async function connectToDatabas(params) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB connected successfully`);
  } catch (error) {
    console.log(`Mongo DB connection Faild `);
  }
}

module.exports = connectToDatabas;
