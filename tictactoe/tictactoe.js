const PlayerFactory =(playername) => {
  const name = playername;
  return {name};
}


const GameboardFactory = (playerName1,playerName2) => {
  const gameboard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
  const player1 = PlayerFactory(playerName1)
  const player2 = PlayerFactory(playerName2)
  const currentPlayer = player1;

  const drawGameBoard = () => {
    let container = document.querySelector(".container")
    container.innerHTML = "";
    gameboard.forEach(row => {
      const rows = document.createElement('div')
      rows.className = "rows"
      container.appendChild(rows)
      row.forEach(cell => {
        const square = document.createElement('div')
        square.className="square"
        rows.appendChild(square)
      })
    });
  }

  return {player1,player2,currentPlayer, drawGameBoard};
};


const gameboard = GameboardFactory();

gameboard.drawGameBoard()
