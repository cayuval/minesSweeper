'use strict'
// initGame() This is called when page loads 

// buildBoard() Builds the board:
// Set mines at random locations
// Call setMinesNegsCount()
// // Return the created board

// buildBoard() Builds the board 
// Set mines at random locations
// Call setMinesNegsCount()
// Return the created board

// renderBoard(board) Render the board as a <table> 
// to the page

// cellClicked(elCell, i, j) Called when a cell (td) is 
// clicked

// cellMarked(elCell) Called on right click to mark a 
// cell (suspected to be a mine)
// Search the web (and 
// implement) how to hide the 
// context menu on right click

// expandShown(board, elCell, i, j)
// When user clicks a cell with no 
// mines around, we need to open 
// not only that cell, but also its 
// neighbors. 
// NOTE: start with a basic 
// implementation that only opens 
// the non-mine 1st degree 
// neighbors


var gBoard;
const Mine = '💣'
const EMPTY = ''
var gSize = 4


initGames()
function initGames() {
    gBoard = buildBoard()
    placeBomb()
    // renderBoard(gBoard)
}

function buildBoard() {
    var board = createMat(gSize)
    // console.table(board);

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = {
                i: i,
                j: j,
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }


            board[i][j] = cell
            if (i === 3 && j === 2) {
                cell.isMine = true
            }

            if (i === 0 && j === 3) {
                cell.isMine = true
            }

            cell.minesAroundCount = setMinesNegsCount(board, i, j)
        }
    }
    // board[3][2].isMine = true
    // board[0][1].isMine = true

    // board[3][2].isShown = true
    // board[0][1].isShown = true
    return board
}
placeBomb()
function placeBomb() {
    console.log(gBoard);
    gBoard[1][2].isMine = true
    gBoard[0][3].isMine = true
    gBoard[3][2].isMine = true
}
howMany(gBoard)
function howMany(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            currCell.minesAroundCount = (setMinesNegsCount(gBoard, currCell.i, currCell.j))
            currCell.minesAroundCount
            console.log(currCell);
        }
    }
}

function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellData = getClassName({ i: i, j: j })
            var cellClass;
            // TODO - change to short if statement
            // console.log(currCell);
            if (currCell.isMine === true) cellClass = 'mine';
            else cellClass = 'empty';

            //TODO - Change To template string
            strHTML += `\t<td class="${cellClass}
            " onclick="reveal(this,${i},${j})" >\n`;

            // TODO - change to switch case statement
            if (currCell.isMine === true) {
                strHTML += Mine;
            } else if (currCell.isMine === false) {
                strHTML += currCell.minesAroundCount;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    // console.log('strHTML is:',strHTML);
    // console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function getClassName(location) {
    var cellClass = 'data-row="' + location.i + '" data-collum="' + location.j + '"'
    return cellClass;
}


function gameOver() {
    var elModal = document.querySelector(".gameover")
    console.log(elModal);
    elModal.style.display = 'block'
}
// howMany(gBoard)

function setMinesNegsCount(mat, rowIdx, colIdx) {
    var count = 0
    // console.log(rowIdx,colIdx);
    // console.log(mat);
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = mat[i][j]
            if (currCell.isMine === true) count++
        }
    }
    // console.log(count);
    // console.log(currCell);
    return count
}
buildBoard()
console.table(gBoard)
renderBoard(gBoard)
function playAgain(elDiv) {
    elDiv.style.display = 'none'
    initGames()
}
function reveal(elCell, i, j) {
    console.log('hi');
    console.log(elCell);

    if (elCell.classList.contains('mine')) {
        gBoard[i][j].isShown = true
        gameOver()
    } else {
        gBoard[i][j].isShown = true
        console.log(gBoard[i][j]);
    }
}
