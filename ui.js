import { GameHandler, Cell } from "./script.js";

const game = GameHandler("Alice", "Bob");

document.addEventListener('DOMContentLoaded', () => {
  const boardEl = document.querySelector('.board');
  if (!boardEl) {
    console.error('No .board element found');
    return;
  }

  // Ensure the board is empty (removes any hardcoded cells)
  boardEl.innerHTML = '';

  // Build a 3x3 grid of cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      boardEl.appendChild(cell);
    }
  }


  boardEl.addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell || !boardEl.contains(cell)) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    const result = game.playRound(row, col);

    if (!result.success) {
      console.log(result.message);
      return;
    }

    cell.innerText = game.getBoard()[row][col].getValue();

    game.playRound(row, col);

    if (result.winner) {
      document.querySelector('.message').textContent = `${result.winner.name} wins!`;
    } else if (result.tie) {
      document.querySelector('.message').textContent = "It's a tie!";
    } else {
      document.querySelector('.message').textContent =
        `Next turn: ${game.getActivePlayer().name} (${game.getActivePlayer().marker})`;
    }
  });
});


