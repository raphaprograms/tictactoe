// need a game board
// need players to play
// gameboard needs to be able to be filled in with tokens

function gameBoard() {

    let rows = 3;
    let columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        let row = [];

        for(let j = 0; j < columns; j++) {
            row.push(' ');
        }

        board.push(row);
    }

    function printBoard() {
        for(let row of board){
            console.log(row.join(' | '));
        }
    }

    function placeToken(row, col, token) {
        if(board[row][col] === ' '){
            board[row][col] = token;
        } else {
            console.log('Cell is already taken!')
        }
    }

    return {
        board, 
        printBoard,
        placeToken,
    };

}

const game = gameBoard();
game.printBoard();
game.placeToken(1, 1, 'O');
game.printBoard();


 function createPlayer(name, token) {
    return {
        name,
        token,

        makeMove(row, col, gameBoard) {
            gameBoard.placeToken(row, col, token);
        }
    }
 };

 let  = {

 }