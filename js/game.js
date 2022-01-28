'use strict'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gBoard = []
const Mine = '💣'
const EMPTY = ''
var time = 0
var elTimer = document.querySelector(".time")
console.log(elTimer);
var intervalIdTime;


function easyLevel() {
    gLevel.SIZE = 4
    gLevel.MINES = 2
    clearInterval(intervalIdTime)
    time = 0
    initGames()
}
function hardLevel() {
    gLevel.SIZE = 8
    gLevel.MINES = 12
    clearInterval(intervalIdTime)
    time = 0
    initGames()
}
function expertLevel() {
    gLevel.SIZE = 12
    gLevel.MINES = 30
    clearInterval(intervalIdTime)
    time = 0
    initGames()
}

function initGames() {
    gGame.shownCount = 0
    gGame.isOn = true
    clearInterval(intervalIdTime)
    time = 0
    elTimer.innerText = 0
    gBoard = buildBoard();
    placeCells(gBoard)
    placeBomb(gBoard, gLevel.MINES)
    countBombs(gBoard)
    renderBoard(gBoard)
    // console.table(gBoard);
    var elGameOver = document.querySelector(".gameover")
    var elModal = document.querySelector(".victory")
    elModal.style.display = 'none'
    elGameOver.style.display = 'none'
}



function buildBoard() {
    var mat = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        var row = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function placeCells(board) {
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
        }
    }
    return board
}



function placeBomb(board, MINES) {
    for (var x = 0; x < MINES;) {

        var randomHeight = getRandomInt(0, board.length - 1)
        var randomWidth = getRandomInt(0, board.length - 1)
        // console.log(randomHeight + "  " + randomWidth);
        if (board[randomHeight][randomWidth].isMine) {
            // do nothing - if the cell is already true, retry
        } else {
            board[randomHeight][randomWidth].isMine = true;
            x++;
        }
    }
    return board
}

function countBombs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = setMinesNegsCount(board, i, j)
        }
    }
    return board
}

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

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            // console.log(currCell);
            var cellClass;
            if (currCell.isMine === true) cellClass = 'mine';
            else cellClass = 'empty';



            if (currCell.isMarked === true) cellClass += 'marked'
            else if (currCell.isShown === true && currCell.isMine === false && currCell.minesAroundCount === 0) {
                cellClass += 'shown'
            }
            strHTML += `\t<td class="${cellClass}
            " onclick="reveal(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})" >\n`;

            if (currCell.isMine === true && currCell.isShown === true) {
                strHTML += Mine
            } else if (currCell.isShown === true && currCell.isMine === false && currCell.minesAroundCount > 0) {
                strHTML += currCell.minesAroundCount
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    // console.log(strHTML);
    var elBoard = document.querySelector(".board")
    // console.log(elBoard);
    elBoard.innerHTML = strHTML
}



function reveal(elCell, i, j) {
    if (gGame.isOn === true) {
        // console.log('hi');
        // console.log(elCell);
        // console.log(gBoard[i][j]);
        if (gBoard[i][j].isMarked === false) {

            if (elCell.classList.contains('mine') || elCell.classList.contains('minemarked')) {
                gGame.shownCount++
                // if(gGame.shownCount===1){intervalIdTime =  setInterval(startCounter,1000)}
                console.log(gGame.shownCount);
                gBoard[i][j].isShown = true
                gBoard = showMines(gBoard)
                renderBoard(gBoard)
                time = 0
                // elTimer.innerText = 0
                gameOver()
                clearInterval(intervalIdTime)
                gGame.isOn = false
            } else {
                gGame.shownCount++
                if (gGame.shownCount === 1) { intervalIdTime = setInterval(startCounter, 1000) }
                gBoard[i][j].isShown = true
                if (gBoard[i][j].minesAroundCount === 0 && gBoard[i][j].isMine === false) {
                    gBoard = setNegsShow(gBoard, i, j)
                }
                renderBoard(gBoard)
                // console.log(gBoard[i][j]);
                if (isGameOver()) {
                    time = 0
                    // elTimer.innerText = 0
                    var elModal = document.querySelector(".victory")
                    elModal.style.display = 'block'
                    gGame.isOn = false

                }
            }
        }
    }

}

var bool = false
function cellMarked(elCell, i, j) {
    var currCell = gBoard[i][j]
    if (bool === false) {
        currCell.isMarked = true
        renderBoard(gBoard)
        bool = true
        // console.log(currCell)
    } else {
        currCell.isMarked = false
        renderBoard(gBoard)
        bool = false
        console.log(currCell);
    }
    if (isGameOver()) {
        time = 0
        // elTimer.innerText = 0
        var elModal = document.querySelector(".victory")
        elModal.style.display = 'block'
        gGame.isOn = false
    }
}

function startCounter() {
    time++
    elTimer.innerText = time
}

function gameOver() {
    var elModal = document.querySelector(".gameover")
    console.log(elModal);
    elModal.style.display = 'block'
}
function isGameOver() {
    // console.log(gBoard);
    var howManyFlaggedCounter = 0
    var howManyEmptyCounter = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine === false && currCell.isShown === true) {
                howManyEmptyCounter++
            }
            if (currCell.isMarked === true && currCell.isMine === true)
                howManyFlaggedCounter++
        }
    }
    if (howManyEmptyCounter === (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES)
        return true
    else if (howManyFlaggedCounter === gLevel.MINES) {
        return true
    }

}

function setNegsShow(mat, rowIdx, colIdx) {
    // var count = 0
    // console.log(rowIdx,colIdx);
    // console.log(mat);
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = mat[i][j]
            // console.log(currCell);
            currCell.isShown = true
        }
    }
    // console.log(count);
    // console.log(currCell);
    return mat
}

// showMines(gBoard)
function showMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine === true) {
                currCell.isShown = true
            }
        }
    }
    return board
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is exclusive and the minimum is inclusive
}