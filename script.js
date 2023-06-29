// otherPlayer object
let otherPlayer;

let isStartingPlayer;

let waitingForOther = true;
let memoryBoard = [];
let chosenColors;


let currentTurn;
let playedFirstTile = false;
let playedSecondTile = false;
let firstSelectedColor;
let firstSelectedTileX;
let firstSelectedTileY;

let score = 0, opponentScore = 0;

const joinForm = document.querySelector("#join-form");
const waitingDiv = document.querySelector("#waiting");
const memoryBoardDiv = document.querySelector("#memory-board")
const turnDiv = document.querySelector("#turn")
const scoreDiv = document.querySelector("#score")
const opponentScoreDiv = document.querySelector("#opponent-score")

joinForm.onsubmit = (e) => {
  e.preventDefault();
  joinRoom(joinForm);
}


function joinRoom(form) {
  
  let username = form.username.value;
  let room = form.room.value;
  if (username.trim() === "" || room.trim() === "") {
    return false;
  }
  
  
  attemptToJoin(username, room, (success, errorMessage) => {
    if (success) {
      console.log("Connected to room " + room)
      form.parentNode.remove();
      // form.remove();
    } else {
      alert(errorMessage);
    }
  })
  return false;
}