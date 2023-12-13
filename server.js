/**
 * require
 * npm i express
 * npm i uuid
 * npm i ws
 * 
 */

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const webserver = express();
webserver.get("/data", (req, res) => {
  res.json({ message: "ok" });
});
webserver.use((req, res) =>
  res.sendFile("/websocket-client.html", { root: __dirname })
);
webserver.listen(3000, () => console.log(`Listening on ${3000}`));

const { WebSocketServer } = require("ws");
const socketServer = new WebSocketServer({ port: 443 });
let allClient = [];
socketServer.on("connection", (ws) => {
  ws.id = uuidv4();

  allClient.push(ws.id);
  console.log("New client connected!");
  ws.send("connection established" + "Your ID is " + clientId);
  ws.on("close", () => console.log("Client has disconnected!"));

  ws.on("message", (data) => {
    console.log(data, "data");
    socketServer.clients.forEach((client) => {
      if (client.id == allClient[0] || client.id == allClient[2]) {
        console.log(`distributing message: ${data}`);
        client.send(`${data}`);
      }
    });
  });
  ws.onerror = () => console.log("websocket error");
});
