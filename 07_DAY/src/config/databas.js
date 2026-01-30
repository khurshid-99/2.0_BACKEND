const mongoose = require("mongoose");

const connectToDataBase = () => {
  try {
    mongoose.connect(process.env.DB_URI);
    console.log(`DB connected `);
  } catch (error) {
    console.log(`DB connection faild ${error}`);
  }
};

module.exports = connectToDataBase;
