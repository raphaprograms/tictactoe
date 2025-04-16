
function gameBoard() {

    let rows = 3;
    let columns = 3;
    const board = [];

    function makeBoard(){
        for(let i = 0; i < rows; i++) {
            let row = [];

            for(let j = 0; j < columns; j++) {
                row.push(' ');
            }

            board.push(row);
        }
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

    function resetBoard(){
        makeBoard();
    }

    makeBoard();

    return {
        board, 
        printBoard,
        placeToken,
        resetBoard
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


function GameController(player1, player2, gameBoardInstance) {
    let currentPlayer = player1;
    let isGameOver = false;

    function switchPlayer() {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    function isBoardFull() {
        return gameBoardInstance.board.flat().every(cell => cell !== ' ');
    }

    function checkWinner() {
        const b = gameBoardInstance.board;
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

    function playTurn(row, col) {
        if (isGameOver) {
            console.log('Game over. Restart to play again.');
            return;
        }

        gameBoardInstance.placeToken(row, col, currentPlayer.token);

        if (checkWinner()) {
            gameBoardInstance.printBoard();
            console.log(`${currentPlayer.name} wins!`);
            isGameOver = true;
            return;
        }

        if (isBoardFull()) {
            gameBoardInstance.printBoard();
            console.log("It's a tie!");
            isGameOver = true;
            return;
        }

        switchPlayer();
        gameBoardInstance.printBoard();
        console.log(`Next turn: ${currentPlayer.name} (${currentPlayer.token})`);
    }

    return { 
        playTurn,
        getCurrentPlayer: () => currentPlayer
    };
}

const gameBoardInstance = gameBoard();
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');

const game = GameController(player1, player2, gameBoardInstance);

game.playTurn(0, 0);
game.playTurn(1, 2);
game.playTurn(1, 2);
game.playTurn(0, 2);
game.playTurn(2, 2);