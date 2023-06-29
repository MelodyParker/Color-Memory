// returns an array of {numOfColors} degrees for hsl evenly spaced around the color wheel
function generateColors(numColors) {
  const degrees = [];
  const increment = 360 / numColors;
  console.log(increment)
  const startingDegree = Math.random() * increment;
  
  for (let i=0; i<numColors; i++) {
    degrees.push(startingDegree + i*increment);
  }
  for (let i=0; i<degrees.length-1; i++) {
    console.log("Difference:", degrees[i+1] - degrees[i])
  }
  console.log(degrees)
  return degrees
}

function degreesToHslString(degrees) {
  // null means black
  if (degrees === null) return "hsl(0, 0, 0)";
  return `hsl(${degrees}, 100%, 50%)`;
}





function populateMemoryBoard() {
  memoryBoard = [];
  chosenColors = generateColors(NUM_COLORS);
  const colorsFree = [];
  const availableColors = [];
  for (let i=0; i<NUM_COLORS; i++) {
    colorsFree.push(2);
    availableColors.push(i);
  }
  let blackXIndex, blackYIndex;
  if (BLACK_EXISTS) {
    blackXIndex = Math.floor(Math.random() * BOARD_WIDTH);
    blackYIndex = Math.floor(Math.random() * BOARD_HEIGHT);
  }
  for (let i=0; i<BOARD_HEIGHT; i++) {
    memoryBoard.push([])
    for (let j=0; j<BOARD_WIDTH; j++) {
      if (j === blackYIndex && i === blackXIndex) {
        memoryBoard[i].push(-1); // means that the square is black
        continue;
      }
      let randomColorIndex = Math.floor(Math.random() * availableColors.length);
      const chosenColorIndex = availableColors[randomColorIndex];
      colorsFree[chosenColorIndex] --;
      if (colorsFree[chosenColorIndex] === 0) {
        availableColors.splice(randomColorIndex, 1);
      }
      memoryBoard[i].push(chosenColorIndex);
      console.log(i, j)
    }
  }
  console.log(memoryBoard)
}


function generateBoardDom() {
  console.log(memoryBoard)
  for (let i=0; i<memoryBoard.length; i++) {
    for (let j=0; j<memoryBoard[0].length; j++) {
      let newElement = document.createElement("div")
      newElement.classList.add("tile")
      newElement.id = `tile-${j}-${i}`
      console.log(`tile-${j}-${i}`)
      newElement.onclick = processTileClickEvent
      memoryBoardDiv.appendChild(newElement)
      memoryBoardDiv.style.gridTemplateColumns = `repeat(${BOARD_WIDTH}, auto)`
    }
  }
}



function processTileClickEvent(e) {
  console.log("Tile Clicked:", e.target.id);
  let xPos = parseInt(e.target.id.split("-")[1]), yPos = parseInt(e.target.id.split("-")[2]);
  if (currentTurn && !e.target.classList.contains("flipped") && !playedSecondTile) {
    flipTile(xPos, yPos);
    socket.emit("flipTile", xPos, yPos)
    
    if (playedFirstTile) {
      playedSecondTile = true;
      if (firstSelectedColor === memoryBoard[yPos][xPos]) {
      setTimeout(() => {
        let firstSelectedTileDiv = document.querySelector(`#tile-${firstSelectedTileX}-${firstSelectedTileY}`);
        let currentSelectedTileDiv = document.querySelector(`#tile-${xPos}-${yPos}`);
        firstSelectedTileDiv.classList.add("removed");
        currentSelectedTileDiv.classList.add("removed");
        playedFirstTile = false;
        playedSecondTile = false;
        unflipAllTiles();
        score ++;
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
        updateTurnDiv()
      }, 2000)
    }
  } else {
    playedFirstTile = true;
    firstSelectedColor = memoryBoard[yPos][xPos];
    firstSelectedTileX = xPos;
    firstSelectedTileY = yPos;
    }
  }
  
}


function unflipAllTiles() {
  document.querySelectorAll('.flipped').forEach(element => {
    element.classList.remove('flipped');
    element.style.removeProperty("background-color")
  }
    );
}