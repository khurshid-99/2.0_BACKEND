require("dotenv").config();
const app = require("./src/app");
const connectToDatabase = require("./src/config/db");

const PORT = process.env.PORT || 5000

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on PORT = 3000 `);
});
