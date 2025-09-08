const { GameHandler, Gameboard, Cell } = require("./script.js");

describe("Tic Tac Toe Gameboard", () => {
    test("board initializes empty", () => {
        const board = Gameboard();
        const cells = board.getBoard().flat();
        expect(cells.every(cell => cell.getValue() === "")).toBe(true);
    });

    test("cannot overwrite a taken cell", () => {
        const board = Gameboard();
        board.setMarker(0, 0, "X");
        expect(board.setMarker(0, 0, "O")).toBe(false);
    });

    test("resetBoard clears the board", () => {
        const board = Gameboard();
        board.setMarker(1, 1, "X");
        board.resetBoard();
        const cells = board.getBoard().flat();
        expect(cells.every(cell => cell.getValue() === "")).toBe(true);
    });
});

describe("Tic Tac Toe GameHandler", () => {
    test("players alternate turns", () => {
        const game = GameHandler();
        expect(game.getActivePlayer().marker).toBe("X");
        game.playRound(0, 0);
        expect(game.getActivePlayer().marker).toBe("O");
    });

    test("detects a win in a row", () => {
        const game = GameHandler();
        game.playRound(0, 0); // X
        game.playRound(1, 0); // O
        game.playRound(0, 1); // X
        game.playRound(1, 1); // O
        game.playRound(0, 2); // X wins
        expect(game.checkWinner()).toBe("X");
    });

    test("detects a win in a column", () => {
        const game = GameHandler();
        game.playRound(0, 0); // X
        game.playRound(0, 1); // O
        game.playRound(1, 0); // X
        game.playRound(1, 1); // O
        game.playRound(2, 0); // X wins
        expect(game.checkWinner()).toBe("X");
    });

    test("detects a diagonal win", () => {
        const game = GameHandler();
        game.playRound(0, 0); // X
        game.playRound(0, 1); // O
        game.playRound(1, 1); // X
        game.playRound(0, 2); // O
        game.playRound(2, 2); // X wins
        expect(game.checkWinner()).toBe("X");
    });

    test("detects a tie correctly", () => {
        const game = GameHandler();
        // Fill the board in a tie state
        game.playRound(0,0); // X
        game.playRound(0,1); // O
        game.playRound(0,2); // X
        game.playRound(1,1); // O
        game.playRound(1,0); // X
        game.playRound(1,2); // O
        game.playRound(2,1); // X
        game.playRound(2,0); // O
        game.playRound(2,2); // X
        expect(game.isTie()).toBe(true);
        expect(game.checkWinner()).toBe(null);
    });
});
