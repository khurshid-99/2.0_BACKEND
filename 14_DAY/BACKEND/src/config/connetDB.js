const mongooes = require("mongoose");

async function connetToDB() {
  try {
    await mongooes.connect(process.env.MONGO_URI);
    console.log(`DB connected successfully`);
  } catch (error) {
    console.log(`DB connetion faild ${error} `);
  }
}

module.exports = connetToDB;
