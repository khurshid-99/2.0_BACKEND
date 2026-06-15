const { default: mongoose } = require("mongoose");

function connectToDatabase() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`Server is connected successfully. `);
  } catch (error) {
    console.log(`Database connection faild ${error} `);
  }
}

module.exports = connectToDatabase;
