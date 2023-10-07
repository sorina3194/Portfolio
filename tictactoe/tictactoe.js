//through a factory function create the blueprint for each of your players
const PlayerFactory =(playername,playermark) => {
  const name = playername;
  const mark = playermark;
  return {name,mark};
}

const GameboardFactory = (playerName1,playerName2) => {
  //the array gameboard will contain all the cells of your gameboard
  let gameboard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
  const player1 = PlayerFactory(playerName1,"X")
  const player2 = PlayerFactory(playerName2,"O")
  //assign the current player as the player 1 and the gamestate as ongoing
  let currentPlayer = player1;
  let gameState = 'ongoing';

  //this function will first create the html elements that will display the grid to play in
  const drawGameBoard = () => {
    let container = document.querySelector(".container")
    container.innerHTML = "";
    gameboard.forEach((row, rowIndex) => {
      const rows = document.createElement('div')
      rows.className = "rows"
      container.appendChild(rows)
      row.forEach((cell, cellIndex) => {
        const square = document.createElement('div')
        square.className="square"
        rows.appendChild(square)

        //now we add an event listener in each of the cells to allow players to add their marks
        square.addEventListener('click', () => {
          if (square.innerHTML === '' && gameState === 'ongoing') {
            square.innerHTML = currentPlayer.mark;
            gameboard[rowIndex][cellIndex] = currentPlayer.mark;
            console.log({rowIndex, cellIndex, gameboard})
            checkWinner();
            checkDraw();
            //switch each user as the current player once they added their marks
            currentPlayer = currentPlayer === player1 ? player2 : player1;
          };

          if (gameState === 'won') {
            // Display a message indicating the winner
            alert(`${currentPlayer.name} wins!`);
          } else if (gameState === 'draw') {
            // Display a message indicating a draw
            alert('It\'s a draw!');
          }

          if (gameState === 'won' || gameState === 'draw') {
            // Display the restart button
            const restartButton = document.getElementById('restartButton');
            restartButton.style.display = 'block';
            restartButton.addEventListener('click', () => {
              // Reset the game state, clear the board, and hide the button
              gameState = 'ongoing';
              gameboard = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
              ];
              drawGameBoard();
              restartButton.style.display = 'none';
              document.querySelector('.input-form').style.display = 'block';
            });
          }
          // Add a click event listener to the restart button
        });
      });
    });
  };

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        gameboard[i][0] === currentPlayer.mark &&
        gameboard[i][1] === currentPlayer.mark &&
        gameboard[i][2] === currentPlayer.mark
      ) {
        gameState = 'won';
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        gameboard[0][i] === currentPlayer.mark &&
        gameboard[1][i] === currentPlayer.mark &&
        gameboard[2][i] === currentPlayer.mark
      ) {
        gameState = 'won';
        return;
      }
    }

    // Check diagonals
    if (
      (gameboard[0][0] === currentPlayer.mark &&
        gameboard[1][1] === currentPlayer.mark &&
        gameboard[2][2] === currentPlayer.mark) ||
      (gameboard[0][2] === currentPlayer.mark &&
        gameboard[1][1] === currentPlayer.mark &&
        gameboard[2][0] === currentPlayer.mark)
    ) {
      gameState = 'won';
    }
  };const checkDraw = () => {
    if (
      gameboard.every((row) => row.every((cell) => cell !== '')) &&
      gameState !== 'won'
    ) {
      gameState = 'draw';
    }
  };


  return {player1,player2,currentPlayer, drawGameBoard, gameState};
};

//add an event listener on the form that takes the names of the players

document.addEventListener('DOMContentLoaded', function () {
  const playerForm = document.getElementById('playerForm');

  playerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    // Check if both player names are provided
    if (player1Name && player2Name) {
      // Create the gameboard and start the game
      const gameboard = GameboardFactory(player1Name, player2Name);
      gameboard.drawGameBoard();

      // Hide the form
      document.querySelector('.input-form').style.display = 'none';
    } else {
      alert('Please enter names for both players.');
    }
  });
});
