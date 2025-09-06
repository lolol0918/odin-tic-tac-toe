// generate the Gameboard() factory

function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];


    // nested loop to generate a 2d array
    const initBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                // generates the Cell() objects
                board[i].push(Cell());
            }
        }
    };

    const getBoard = () => board;

    const resetBoard = () => initBoard();

    const setMarker = (row, col, marker) => {
        return board[row][col].addMarker(marker);
        // returns true/false if move was valid
    };

    initBoard();

    return { getBoard, resetBoard, setMarker };
}

function Cell() {
    let value = "";

    const getValue = () => value;

    const addMarker = (marker) => {
        if (value === "") {
            value = marker;
            return true; // returns true the cell is not yet occupied
        }

        // does not change anything if it is occupied
        return false; // fails because the cell is already occupied
    };

    return { getValue, addMarker };
};

function GameHandler(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            marker: 'X'
        },
        {
            name: playerTwoName,
            marker: 'O'
        },
    ];

    // TODO

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;


    const playRound = (row, col) => {
        console.log(board.getBoard()[row][col]);
        const success = board.setMarker(row, col, activePlayer.marker);

        if (!success) {
            console.log("cell is already taken");
            return;
        }
        // For now: just log board and switch player
        console.table(
            board.getBoard().map(row => row.map(cell => cell.getValue()))
        );

        switchPlayerTurn();

        console.log(getActivePlayer());

    };

    const getBoard = () => board.getBoard();

    const checkWinner = () => { };
    const isTie = () => { };
    const resetGame = () => board.resetBoard();

    return {
        switchPlayerTurn,
        getActivePlayer,
        getBoard, 
        playRound,
        checkWinner,
        isTie,
        resetGame,
    };
};

const game = GameHandler("Alice", "Bob");

// Play a couple moves
game.playRound(0, 0); // Alice places X
game.playRound(1, 1); // Bob places O

console.log("Before reset:");
console.table(
    gameBoardState = game.getBoard().map(row => row.map(cell => cell.getValue()))
);

// Reset the board
game.resetGame();

console.log("After reset:");
console.table(
    gameBoardState = game.getBoard().map(row => row.map(cell => cell.getValue()))
);


