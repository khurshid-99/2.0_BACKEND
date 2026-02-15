const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected success fully `);
  } catch (error) {
    console.log(`DB connetion faild ${error} `);
  }
}

module.exports = connectToDB;
