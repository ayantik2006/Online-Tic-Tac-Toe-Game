const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors({
  origin:"*"
}));
app.use(express.json());

const server = http.createServer(app);


const { initSocket } = require("./socket");
initSocket(server);

server.listen(8080, () => {
  console.log("server live");
});
