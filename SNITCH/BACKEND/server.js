import app from "./src/app.js";
import connectToDataBase from "./src/configs/dataBase.js";

connectToDataBase()

app.listen(3000, () => {
  console.log(`Server is running on PORT 3000!`);
});
