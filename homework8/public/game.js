const statusDisplay = document.querySelector('.game--status');
const playerDisplay = document.getElementById('game--player')

let gameActive = false;
let currentPlayer
let activePlayer = "X"
let gameState = ["", "", "", "", "", "", "", "", ""];
let roomName

socket.on("init", handleInit);

socket.on("makeX", () => {
    currentPlayer = "X"
     playerDisplay.innerText = `You are playing ${currentPlayer}`
});

function handleInit(number) {
    currentPlayer = number[0];
    playerDisplay.innerHTML = `You are playing ${currentPlayer}`
    roomName = number[1]   
    console.log(roomName) 
    if(currentPlayer == "X") {
        statusDisplay.innerText = "Wait for the second player to join"
    }   
  }

socket.on("playerJoin", () => {
    if(currentPlayer == "X") {        
        gameActive = true
        statusDisplay.innerText = `It's ${currentPlayer}'s turn`
    }
    else {
        statusDisplay.innerHTML = `It's X's  turn`
    }
});
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

statusDisplay.innerHTML = activePlayer

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let allCells = Array.from(document.querySelectorAll('.cell'));


  socket.on('warning', function(msg){
    statusDisplay.innerText = msg;
  });

  socket.on('opponentMove', handleOpponentMove)
  function handleOpponentMove(data) {
      gameState = data[0];
      for (let i = 0; i <= allCells.length-1 ; i++ ) {
          allCells[i].innerHTML = gameState[i]
        }
        gameActive = true;
        activePlayer = data[1] 
        console.log(activePlayer)       
  }

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    for (let i = 0; i <= allCells.length-1 ; i++ ) {
        allCells[i].innerHTML = gameState[i]
    }
    socket.emit('move', [gameState, roomName])
    gameActive = false
    console.log(gameActive)
}


function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    console.log(gameState)
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        let data =  {player: currentPlayer, room: roomName}
        socket.emit('Win', data)
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        let data =  {player: currentPlayer, room: roomName}
        socket.emit('Draw', data)
        gameActive = false;
        return;
    }

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer !== activePlayer) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    console.log(roomName)
    socket.emit('restart', roomName)
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);