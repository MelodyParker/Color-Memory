const socket = io("https://color-memory-server.developerperson.repl.co");

socket.on("print", msg => {
  console.log(msg)
})

socket.on("join", (id, otherUsername) => {
  other = {};
  other.id = id;
  other.username = otherUsername;
  console.log(`${otherUsername} has joined.`)
})


function attemptToJoin(username, room, callback) {
  console.log("attempting to join game...");
  socket.emit("join", username, room, (success, currentIsStartingPlayer, otherPlayerObj, errorMessage) => {
    if (!success) {
      callback(false, errorMessage);
      return;
    }
    console.log("successfully joined game")
    if (otherPlayerObj) { // if the player is joining an active room
      otherPlayer = otherPlayerObj
      waitingForOther = false;
    }
    isStartingPlayer = currentIsStartingPlayer;
    callback(true);
    
  })
}