
const WINNING_COMBINATIONS = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const placeMarker = (index, marker) => {
    board[index] ||= marker;
  };

  const getValue = (index) => board[index];

  const checkWin = () => WINNING_COMBINATIONS.find((line) => line
    .map((index) => board[index])
    .reduce((acc, cur) => (acc === cur ? acc : "")));

  const isTie = () => !board.includes("");

  return { placeMarker, getValue, isTie, checkWin };
 })();

const gameLoop = (() => {
  const squares = document.querySelectorAll(".square");
  const boardElement = document.getElementById("board");
  const winnerMessageText = document.getElementById('win-message-text');
  const winnerMessage = document.getElementById("win-message");

  let currentPlayer = "X";

  const playerMove = (e, i) => {
    const index = e ? e.target.dataset.index : i;
    const currentMarker = currentPlayer;
    gameBoard.placeMarker(index, currentMarker);
    updateBoard();
  };

  const updateBoard = () => {
    squares.forEach((square, i) => {
      const marker = gameBoard.getValue(i);
      square.innerHTML = `<span style='font-size:65px'>${marker}</span>`
      square.classList.add("occupied");
    });
    checkGameOver();
  };

  const checkGameOver = () => {
    const winner = gameBoard.checkWin();
    if (winner) {
      winnerMessageText.innerHTML = (`Player ${currentPlayer} wins!`);
      winnerMessage.classList.add("show");
    } else if (gameBoard.isTie()) {
      winnerMessageText.innerHTML = ("It's a tie!");
      winnerMessage.classList.add("show");
    } else {
      switchTurns();
    }
  };

  const switchTurns = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
   };

   squares.forEach((square) => square.addEventListener('click', playerMove, {once: true}));
   document.querySelector(".start").addEventListener('click', function(){location.reload()});
 })();
