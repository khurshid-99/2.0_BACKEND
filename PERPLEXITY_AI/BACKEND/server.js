import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/dataBase.js";

connectToDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
