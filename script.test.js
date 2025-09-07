const { GameHandler } = require("./script");

describe("Tic Tac Toe GameHandler", () => {
    let game;

    beforeEach(() => {
        game = GameHandler("Alice", "Bob");
    });

    test("places markers alternately and updates active player", () => {
        // Alice (X) plays
        game.playRound(0, 0);
        let values = game.getBoard().map(row => row.map(cell => cell.getValue()));
        expect(values[0][0]).toBe("X");
        expect(game.getActivePlayer().name).toBe("Bob");

        // Bob (O) plays
        game.playRound(1, 1);
        values = game.getBoard().map(row => row.map(cell => cell.getValue()));
        expect(values[1][1]).toBe("O");
        expect(game.getActivePlayer().name).toBe("Alice");
    });

    test("does not allow placing marker on occupied cell and does not switch player", () => {
        game.playRound(0, 0); // Alice places X
        const activeBefore = game.getActivePlayer().name;

        game.playRound(0, 0); // Bob tries to place O on same cell
        const values = game.getBoard().map(row => row.map(cell => cell.getValue()));
        expect(values[0][0]).toBe("X");
        expect(game.getActivePlayer().name).toBe(activeBefore); // Player should not switch
    });

    test("detects horizontal win correctly", () => {
        game.playRound(0, 0); // Alice X
        game.playRound(1, 0); // Bob O
        game.playRound(0, 1); // Alice X
        game.playRound(1, 1); // Bob O
        game.playRound(0, 2); // Alice X wins

        expect(game.checkWinner()).toBe("X");
    });

    test("detects vertical win correctly", () => {
        game.playRound(0, 0); // Alice X
        game.playRound(0, 1); // Bob O
        game.playRound(1, 0); // Alice X
        game.playRound(1, 1); // Bob O
        game.playRound(2, 0); // Alice X wins

        expect(game.checkWinner()).toBe("X");
    });

    test("detects diagonal win correctly", () => {
        game.playRound(0, 0); // Alice X
        game.playRound(0, 1); // Bob O
        game.playRound(1, 1); // Alice X
        game.playRound(0, 2); // Bob O
        game.playRound(2, 2); // Alice X wins

        expect(game.checkWinner()).toBe("X");
    });

    test("detects tie correctly", () => {
        // Fill the board with no winner
        game.playRound(0, 0); // X
        game.playRound(0, 1); // O
        game.playRound(0, 2); // X
        game.playRound(1, 1); // O
        game.playRound(1, 0); // X
        game.playRound(1, 2); // O
        game.playRound(2, 1); // X
        game.playRound(2, 0); // O
        game.playRound(2, 2); // X

        expect(game.checkWinner()).toBe(null);
        expect(game.isTie()).toBe(true);
    });

    test("resets the board correctly", () => {
        game.playRound(0, 0);
        game.playRound(1, 1);

        game.resetGame();

        const values = game.getBoard().map(row => row.map(cell => cell.getValue()));
        expect(values.flat().every(v => v === "")).toBe(true);
        expect(game.getActivePlayer().name).toBe("Alice"); // Active player resets to first player
    });
});
