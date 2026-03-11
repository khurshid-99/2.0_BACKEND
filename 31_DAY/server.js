/**
 *
 * @io => server
 * @socket => single user
 *
 * @on => event ko listen karna
 * @emit => event ko fire karna
 *
 *
 */

import app from "./src/app.js";

import { createServer } from "http"; // module
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log(`new connection created`);

  socket.on("message", (msg) => {
    console.log(`user fired message event.`);

    console.log(msg);
  });
});

httpServer.listen(3000, () => {
  console.log(`Server is running on port - 3000`);
});
