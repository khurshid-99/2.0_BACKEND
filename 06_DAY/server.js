const app = require("./src/app");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToMongoose = () => {
  mongoose.connect(process.env.DB_URI).then(() => {
    console.log("DB is connected");
  });
};
connectToMongoose();

app.listen(3000, () => {
  console.log("server is running on port 3000 ");
});
