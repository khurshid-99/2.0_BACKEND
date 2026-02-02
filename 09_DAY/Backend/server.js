require("dotenv").config();
const app = require("./src/app");
const mongoDB = require("./src/config/mongoDb");


mongoDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
