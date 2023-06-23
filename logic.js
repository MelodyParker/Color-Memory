// returns an array of {numOfColors} degrees for hsl evenly spaced around the color wheel
function generateColors(numColors) {
  const degrees = [];
  const increment = 360 / numColors;
  const startingDegree = Math.random() * increment;
  for (let i=0; i<numColors; i++) {
    degrees.push(startingDegree + i*increment);
  }
  return degrees
}

function degreesToHslString(degrees) {
  // null means black
  if (degrees === null) return "hsl(0, 0, 0)";
  return `hsl(${degrees}, 100%, 50%)`;
}



function populateMemoryBoard() {
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
      }
      let randomColorIndex = Math.floor(Math.random() * availableColors.length);
      const chosenColorIndex = availableColors[randomColorIndex];
      chosenColors[chosenColorIndex] --;
      if (chosenColors[chosenColorIndex] === 0) {
        availableColors.splice(randomColorIndex, 1);
      }
      memoryBoard[i].push(chosenColorIndex);
    }
  }
}