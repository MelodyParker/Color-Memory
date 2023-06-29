function updateTurnDiv() {
  // currentTurn is a boolean that is true when 
  // it's your turn and false when it's not
  turnDiv.innerText = (currentTurn) ? "It's your turn!" : "Waiting on opponent's turn...";
}

function flipTile(xIndex, yIndex) {
  let selectedTile = document.querySelector(`#tile-${xIndex}-${yIndex}`);
  if (selectedTile.classList.contains("flipped")) {
    selectedTile.removeClass("flipped")
    selectedTile.style.removeProperty("background-color");
  } else {
    selectedTile.classList.add("flipped");
    selectedTile.style.backgroundColor = degreesToHslString(chosenColors[memoryBoard[yIndex][xIndex]]);
  }
}

function updateScores() {
  scoreDiv.innerText = "Your Score: " + score;
  opponentScoreDiv.innerText = "Opponent's Score: " + opponentScore
}