const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

const clientRooms = {};
let join = false
let lastRoom = ""

io.on("connection", (client) => {
  console.log("a user connected");
  let room 
  if (!join) {
      handleNewGame(client) 
      room = client.id
    } else {
      handleJoinGame(client)
      room = lastRoom
  }

  client.on("move", (data) => {
      let room
    if (clientRooms[client.id]) {
        room = client.id
    } else {
        room = data[1]        
    } 
    if(clientRooms[room].opponent === "") {
      io.to(room).emit('warning', "Wait for the second player to join") 
      return 
    }
    clientRooms[room].field = data[0];
    clientRooms[room].activePlayer === "X" ? clientRooms[room].activePlayer = "O" : clientRooms[room].activePlayer = "X"
    client.broadcast.to(room).emit('opponentMove', [clientRooms[room].field, clientRooms[room].activePlayer])
    io.to(room).emit('warning', `It's ${clientRooms[room].activePlayer}'s turn`)
  })

  client.on("restart", room => {
    clientRooms[room].field = ["", "", "", "", "", "", "", "", ""]
    clientRooms[room].activePlayer = "X"
    io.to(room).emit('opponentMove', [clientRooms[room].field, "X"]);
    io.to(room).emit('warning', "Game was restarted") 
  })

  client.on("Win", (data) => {
    io.to(data.room).emit('warning', `Player ${data.player} has won`)
  })

  client.on("Draw", (data) => {
    io.to(data.room).emit('warning', `It's a draw!`)
  })

  client.on("disconnect", () => {    
    console.log(room + "left");
    if(clientRooms[room].opponent !== "") {
      io.to(room).emit('warning', "Your opponent have left, you won")
      lastRoom = room 
      join = true 
      clientRooms[room].opponent = ""
      clientRooms[room].field = ["", "", "", "", "", "", "", "", ""]
      clientRooms[room].activePlayer = "X"
      io.to(room).emit('opponentMove', [clientRooms[room].field, clientRooms[room].activePlayer]);
      io.to(room).emit('makeX');
    } else {
      join = false
    }
  });
});

function handleNewGame(client) {
  clientRooms[client.id] = {}
  clientRooms[client.id].id = client.id
  clientRooms[client.id].opponent = ""
  clientRooms[client.id].field = ["", "", "", "", "", "", "", "", ""]
  clientRooms[client.id].activePlayer = "X"
  client.join(client.id);
  join = true
  lastRoom = client.id
  client.emit("init", ["X", client.id]);
}

function handleJoinGame(client) {
  client.join(lastRoom);
  clientRooms[lastRoom].opponent = client.id
  let obj = ["O", lastRoom]
  client.emit("init", obj);
  join = false
  io.to(lastRoom).emit("playerJoin")
}

http.listen(PORT, () => {
  console.log("listening on *:3000");
});
