const socket = io("https://color-memory-server.developerperson.repl.co");

socket.on("print", msg => {
  console.log(msg)
})

// socket.on("join", (id, otherUsername) => {
//   other = {};
//   other.id = id;
//   other.username = otherUsername;
//   console.log(`${otherUsername} has joined.`)
// })



function attemptToJoin(username, room, callback) {
  console.log("attempting to join game...");
  socket.emit("join", username, room, (success, currentIsStartingPlayer, otherPlayerObj, errorMessage, colors, generatedBoard) => {
    if (!success) {
      callback(false, errorMessage);
      return;
    }
    console.log("successfully joined game")
    if (otherPlayerObj) { // if the player is joining an active room
      console.log("joining active room")
      otherPlayer = otherPlayerObj
      waitingForOther = false;
      chosenColors = colors;
      memoryBoard = generatedBoard;
      generateBoardDom();
      
    } else {
      waitingDiv.innerText = "Waiting for opponent..."
      populateMemoryBoard();
      socket.emit("boardGenerated", chosenColors, memoryBoard)
      generateBoardDom();
    }
    isStartingPlayer = currentIsStartingPlayer;
    currentTurn = isStartingPlayer;
    if (otherPlayerObj) {
      updateTurnDiv()
    }
    callback(true);
    
  })
  
}





socket.on("join", (otherPlayerObj) => {
  
  otherPlayer = otherPlayerObj
  waitingDiv.innerText = `${otherPlayer.username} Connected!`
  updateTurnDiv()
  // alert(`Your opponent, ${otherPlayer.username}, has joined the game!`)
})


socket.on("flipTile", (xIndex, yIndex) => {
  if (currentTurn || playedSecondTile) return;
  flipTile(xIndex, yIndex);
  if (playedFirstTile) {
    playedSecondTile = true;
    if (firstSelectedColor === memoryBoard[yIndex][xIndex]) {
      setTimeout(() => {
        let firstSelectedTileDiv = document.querySelector(`#tile-${firstSelectedTileX}-${firstSelectedTileY}`);
        let currentSelectedTileDiv = document.querySelector(`#tile-${xIndex}-${yIndex}`);
        firstSelectedTileDiv.classList.add("removed");
        currentSelectedTileDiv.classList.add("removed");
        playedFirstTile = false;
        playedSecondTile = false;
        unflipAllTiles();
        opponentScore ++;
        updateScores();
        currentTurn = !currentTurn;
        updateTurnDiv();
      }, 500)
    } else {
      setTimeout(() => {
        playedFirstTile = false;
        playedSecondTile = false;
        unflipAllTiles();
        currentTurn = !currentTurn;
        updateTurnDiv();
        
      }, 2000)
    }
  } else {
    playedFirstTile = true;
    firstSelectedColor = memoryBoard[yIndex][xIndex];
    firstSelectedTileX = xIndex;
    firstSelectedTileY = yIndex;
  }
})