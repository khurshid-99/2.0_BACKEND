import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/dataBase.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

connectToDB();

const httpServer = http.createServer(app);
initSocket(httpServer);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
