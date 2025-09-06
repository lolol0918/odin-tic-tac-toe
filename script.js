// generate the gameBoard factory

function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];


    // nested loop to generate a 2d array
    const initBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                // this part "[]" is subject to changes 
                // just a placeholder
                // need to change it later after implementing the cell object
                board[i].push(Cell());
            }
        }
    };

    const getBoard = () => board;

    const resetBoard = () => initBoard();

    const setMarker = (row, col, marker) => {
        console.log("hello");
        board[row][col].addMarker(marker);
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

        return false; // fails because the cell is already occupied

    };

    return { getValue, addMarker };
};

const game = Gameboard();


game.setMarker(0, 0, 'X');
console.log(game.getBoard()[0][0].getValue());