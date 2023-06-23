// otherPlayer object
let otherPlayer;

let isStartingPlayer;

let waitingForOther = true;
let memoryBoard = [];
let chosenColors;

const joinForm = document.querySelector("#join-form");
const waitingDiv = document.querySelector("#waiting");
const memoryBoardDiv = document.querySelector("#memory-board")



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
      form.remove();
      populateMemoryBoard();
      if (waitingForOther) {
        waitingDiv.innerText = "Waiting for opponent..."
        let chosenColors = generateColors(NUM_COLORS)
      } else {
        
       }
    } else {
      alert(errorMessage);
    }
  })
  return false;
}