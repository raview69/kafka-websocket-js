import express from "express";
import consumerRun from "./consumer.js";
import { wss1, wss2, startWebSocketServers } from "./service/websocket.js";
import adminInit from "./admin.js";
import bodyParser from "body-parser";
import constrollers from "./controller.js";

const app = express();
const jsonParser = bodyParser.json();

const PORT = 8000;

app.get("", (req, res, next) => {
  console.log("Hello to Node Express and Kafkajs");
  return res.send("<h1>Hello to Node Express and Kafkajs</h1>");
});

app.post("/api/send", jsonParser, constrollers.sendMessageToKafka);

const init = async () => {
  await adminInit();
  await startWebSocketServers();
  await consumerRun("realtime-data", ["thabishs-topic"], wss1);
  await consumerRun("realtime-data", ["thabishs-topic"], wss2);
};

app.listen(PORT, async () => {
  console.log(`Listiening to port ----> ${PORT}`);
  init();
});
