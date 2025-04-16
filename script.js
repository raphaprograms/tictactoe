
let gameboard = function() {

    let rows = 3;
    let columns = 3;
    const board = [];

    for(i = 0; i < rows; i++) {
        row = [];
        for(j = 0; j < columns; j++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
}
 console.log(gameboard());