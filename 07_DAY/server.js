require("dotenv").config();
const connectToDataBase = require("./src/config/databas");
const app = require("./src/app");


connectToDataBase();


app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
