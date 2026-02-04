require("dotenv").config();
const app = require("./src/app");
const connetDB = require("./src/config/mongoDB");

connetDB();

app.listen(3000, () => {
  console.log("Surver is running on PORT 3000");
});
