import { GameHandler } from "./script.js";

const boardEl = document.querySelector(".board");
const messageEl = document.querySelector(".message");
const resetBtn = document.getElementById("reset-btn");

const game = GameHandler("Alice", "Bob");

function renderBoard() {
  const boardState = game.getBoard();
  boardEl.innerHTML = "";

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = boardState[row][col].getValue();
      boardEl.appendChild(cell);
    }
  }
}

function updateMessage(result) {
  if (result?.winner) {
    messageEl.textContent = `${result.winner.name} wins!`;
  } else if (result?.tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent =
      `Next turn: ${game.getActivePlayer().name} (${game.getActivePlayer().marker})`;
  }
}

function handleClick(e) {
  const cell = e.target.closest(".cell");
  if (!cell || !boardEl.contains(cell)) return;

  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);

  const result = game.playRound(row, col);

  if (!result.success) {
    console.log(result.message);
    return;
  }

  renderBoard();
  updateMessage(result);
}

// Event listeners
boardEl.addEventListener("click", handleClick);

resetBtn.addEventListener("click", () => {
  game.resetGame();
  renderBoard();
  updateMessage();
});

// Initial render
renderBoard();
updateMessage();
