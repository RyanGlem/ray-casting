import { Server } from "colyseus"
import { WebSocketTransport } from "@colyseus/ws-transport"
import express from "express"
import cors from "cors"
import http from "http"

import HubRoom from "./rooms/hubRoom"
//import http2 from "http2"; <- For HTTP2 Dev server
//import fs from "fs";

const app = express()
const port = 80
app.use(cors())
app.use(express.json())
app.use(express.static('src'))
app.use(express.static('src/styles'))

const server = http.createServer(app)
const gameServer = new Server ({
  transport: new WebSocketTransport({
    server
  })
})

gameServer.define("hub", HubRoom)
gameServer.listen(port)

/*server.on("error", (err) => console.error(err));

const server = http2.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
});

server.on("stream", (stream, headers) => {
  const path = headers[":path"];
  stream.setEncoding("utf8");

  switch (path) {
    case "/":
      fs.readFile("src/index.html", (err, data) => {
        if (err) throw err;
        stream.end(data);
      });
      break;
    case "/bundle.js":
      fs.readFile("src/bundle.js", (err, data) => {
        if (err) throw err;
        stream.respond({
          status: 200,
          "content-type": "text/javascript;",
        });
        stream.end(data);
      });
      break;
    case "/output.css":
      fs.readFile("src/styles/output.css", (err, data) => {
        if (err) throw err;
        stream.respond({
          status: 200,
          "content-type": "text/css",
        });
        stream.end(data);
      });
      break;
    default:
      stream.write("Route not found");
      stream.end();
  }
});

server.on("session", (session) => {
  console.log("session started");
  session.on("connect", () => {
    console.log("User connected");
  });
  session.on("close", () => {
    console.log("session closed");
  });
  session.on("error", (err : any) => console.error("session error", err));
});
*/



