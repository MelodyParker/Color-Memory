function setUpBoardStyles() {
  memoryBoardDiv.style.gridTemplateColumns = `repeat(${BOARD_WIDTH}, ${100/BOARD_WIDTH}%)`;
  memoryBoardDiv.style.gridTemplateRows = "auto";
}

function addTilesToBoard() {
  for (let i=0; i<BOARD_HEIGHT; i++) {
    for (let j=0; j<BOARD_WIDTH; j++) {
      const tileElement = document.createElement("div");
      tileElement.id = `tile-${i}-${j}`;
      tileElement.classList.push("tile")
      memoryBoardDiv.appendChild(tileElement);
      tileElement.onclick = e => {
        const indices = e.target.id.split("-").slice(1);
        tileClicked(indices[0], indices[1]);
      }
    }
  }
}