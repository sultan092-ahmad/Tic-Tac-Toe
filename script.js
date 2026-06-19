
const board = Array(9).fill("");
const gameBoard = document.querySelector(".game-board");
const startBtn = document.querySelector(".start-game-button");
const restartBtn = document.querySelector(".restart-game-button");
const winnerModal = document.querySelector(".winner-modal");
const winnerText = document.querySelector(".winner-modal p");

const player1 = document.querySelector("#player1-name");
const player2 = document.querySelector("#player2-name");

let currentPlayer = "x";

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// create board
for (let i = 0; i < 9; i++) {
  const btn = document.createElement("button");
  btn.classList.add("board-button");
  btn.dataset.index = i;
  gameBoard.appendChild(btn);
}

// start the game
startBtn.addEventListener("click", () => {
  document.querySelector(".start-page").classList.add("hidden");
  document.querySelector(".main-page").classList.remove("hidden");
});

// changing the names
[player1, player2].forEach(player => {
  player.addEventListener("click", () => {
    const name = prompt("Enter player name :-");
    if (name) player.textContent = name;
  });
});

const buttons = document.querySelectorAll(".board-button");

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return pattern;
    }
  }

  return null;
}

function showWinner() {
  const winnerName =
    currentPlayer === "x"
      ? player1.textContent
      : player2.textContent;

  winnerText.textContent = `${winnerName} has won !`;
  winnerModal.classList.add("show-modal");
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const index = button.dataset.index;

    if (board[index]) return;

    board[index] = currentPlayer;
    button.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
      winner.forEach(i =>
        buttons[i].classList.add("win-highlight")
      );

      buttons.forEach(btn => (btn.disabled = true));
      showWinner();
      return;
    }

    if (board.every(cell => cell !== "")) {
      winnerText.textContent = "It's a Draw !";
      winnerModal.classList.add("show-modal");
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
  });
});

// restart your game 
restartBtn.addEventListener("click", () => {
  board.fill("");
  currentPlayer = "x";

  buttons.forEach(btn => {
    btn.textContent = "";
    btn.disabled = false;
    btn.classList.remove("win-highlight");
  });

  winnerModal.classList.remove("show-modal");
});
