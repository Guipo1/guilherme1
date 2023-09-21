const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
var users = 0;

const chaves = "guilherme";
//["guilherme"]
const msg = [];
// Rota princip
var oi;
//var eu = "guilherme";
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/index1.html/:id", async (req, res) => {
  const id = req.params.id;
  if (oi == 1 || id == chaves) {
    res.sendFile(__dirname + "/index1.html");
  } else {
    res.status("nao tem aceso");
  }
});
app.get("/index1.html", async (req, res) => {
  res.status(200).send("aceso negado");
});
io.on("connection", (socket) => {
  users++;
  for (const a of msg) {
    socket.emit("aray1", a);
  }

  socket.on("valor", (valor) => {
    if (valor == chaves) {
      socket.emit("senhaValida", valor);
      oi = 1;
    } else {
      socket.emit("senhaIncorreta", valor);
      oi = 0;
    }
  });
  socket.on("newaray", (newaray) => {
    //k += 1;
    msg.push(newaray);
    console.log(newaray);
    io.emit("aray1", newaray); //nomes
  });
  io.on("disconnect", () => {
    users--;
  });
  io.emit("user", users);
});
// Configurar conexão Socket.io
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Servidor Socket.io rodando na porta ${port}`);
});            
            
