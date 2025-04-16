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



 function createPlayer(name, token) {
    return {
        name,
        token,

        makeMove(row, col, gameBoard) {
            gameBoard.placeToken(row, col, token);
        }
    }
 };

const game = gameBoard();
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');

player1.makeMove(0, 0 , game);

game.printBoard();

player2.makeMove(1, 1, game);

game.printBoard();

functionGameController(player1, player2, board) {
    let currentPlayer = player1;
    let isGameOver = false;

    function switchPlayer() {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    function isBoardFull() {
        return board.board.flat().every(cell => cell !== '');
    }

    function checkWinner() {
        const b = board.board;
        const t = currentPlayer.token;

        for (let row of b) {
            if (row.every(cell => cell === t)) return true;
        }

        for (let col = 0; col < b[0].length; col++) {
            if (b.every(row => row[col] ===t)) return true;
        }

        if (b[0][0] === t && b[1][1] === t && b[2][2] === t) return true;
        if (b[0][2] === t && b[1][1] === t && b[2][0] === t) return true;

        return false;
    }


    return { 

    };
}


 let  = {

 }