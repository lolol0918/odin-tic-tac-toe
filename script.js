// generate the gameBoard factory

function gameBoard() {
    const rows = 3;
    const columns = 3;
    let board = [];


    // nested loop to generate a 2d array
    const initBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push([]);
            }
        }
    };

    const getBoard = () => board;

    initBoard();

    return { getBoard };
}

function Cell() {
    // TODO
};

const game = gameBoard();

console.table(game.getBoard());