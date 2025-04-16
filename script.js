
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


function gameController(player1, player2, gameBoardInstance) {
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
        checkWinner,
        getCurrentPlayer: () => currentPlayer
    };
}

function startGameFactory() {
    function startGame(name1, name2){
        
        const player1 = createPlayer(name1 || 'Player 1', 'X');
        const player2 = createPlayer(name2 || 'Player 2', 'O');
            
        const newBoard = gameBoard();
        const newController = gameController(player1, player2, newBoard);
        const display = displayController(newBoard, newController);

        display.renderBoard(newBoard.board);
        display.updateTurnDisplay();
        display.updateWinDisplay();
    }

    return { startGame};
}

function displayController (gameBoardInstance, gameController) {
    const container = document.querySelector('.container');
    const boardContainer = document.querySelector('.game-board');

    boardContainer.textContent = ' ';

    let turnIndicator = document.querySelector('.turn-indicator');
    if (!turnIndicator) {
        const turnIndicator = document.createElement('div');
        turnIndicator.classList.add('turn-indicator');
        container.appendChild(turnIndicator);
    }

    let winIndicator = document.querySelector('.win-indicator');
    if (!winIndicator) {
        const winIndicator = document.createElement('div');
        winIndicator.classList.add('win-indicator');
        container.appendChild(winIndicator);
    }


    function renderBoard(board) {
        boardContainer.textContent = ' ';

        board.forEach((row, rowIndex) => {

            row.forEach((cell, colIndex) => {

                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.textContent = cell;

                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = colIndex;

                cellDiv.addEventListener('click', () => {
                    gameController.playTurn(rowIndex, colIndex);
                    updateTurnDisplay();
                    updateWinDisplay();
                    renderBoard(board);
                })

                boardContainer.appendChild(cellDiv);
            })
        })
    }

    function updateTurnDisplay() {
        const currentPlayer = gameController.getCurrentPlayer();
        turnIndicator.textContent = `${currentPlayer.name}'s turn (${currentPlayer.token})`;
    }

    function updateWinDisplay() {
        const winner = gameController.checkWinner();
        const currentPlayer = gameController.getCurrentPlayer();
        if (winner){
            turnIndicator.textContent = '';
            winIndicator.textContent = `${currentPlayer.name}'s WINS! (${currentPlayer.token}) WINS!`;
            return;
        }
    }


    function handleForm() {
        const gameStarter = startGameFactory();

        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const name1 = document.getElementById('player1-name').value.trim();
            const name2 = document.getElementById('player2-name').value.trim();

            gameStarter.startGame(name1, name2);
        });
    }

    return {
        renderBoard,
        updateTurnDisplay,
        updateWinDisplay,
        handleForm
    };
}

const sampleBoard = gameBoard();
const samplePlayer1 = createPlayer('Player 1', 'X');
const samplePlayer2 = createPlayer('Player 2', 'O');
const sampleController = gameController(samplePlayer1, samplePlayer2, sampleBoard);

const display = displayController(sampleBoard, sampleController);
display.handleForm(); 