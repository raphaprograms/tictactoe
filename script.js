
function gameBoard() {

    let rows = 3;
    let columns = 3;
    const board = [];

    function makeBoard(){
        board.length = 0;
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
            return true;
        } else {
            console.log('Cell is already taken!')
            return false;
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

        const moveMade = gameBoardInstance.placeToken(row, col, currentPlayer.token);

        if (!moveMade) return;

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

    function restartGame() {
        gameBoardInstance.resetBoard();
        isGameOver = false;
        currentPlayer = player1;
        console.log('Game Restarted!');
        gameBoardInstance.printBoard();
        console.log(`First turn: ${currentPlayer.name} (${currentPlayer.token})`);


    }

    return { 
        playTurn,
        restartGame,
        getCurrentPlayer: () => currentPlayer
    };
}

function displayController () {
    const boardContainer = document.querySelector('.game-board');

    function renderBoard(board) {
        boardContainer.textContent = '';

        board.forEach((row, rowIndex) => {

            row.forEach((cell, colIndex) => {

                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.textContent = cell;

                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = colIndex;

                boardContainer.appendChild(cellDiv);
            })
        })
    }

    return {
        renderBoard
    }
}

const gameBoardInstance = gameBoard();
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');

const playGame = GameController(player1, player2, gameBoardInstance);

const display = displayController();

playGame.playTurn(0, 0);
display.renderBoard(gameBoardInstance.board);
playGame.playTurn(1, 2);
playGame.restartGame();
playGame.playTurn(1, 2);
playGame.playTurn(1, 2);
playGame.playTurn(2, 2);

