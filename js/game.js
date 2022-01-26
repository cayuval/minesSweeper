'use strict'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoard = []
const Mine = '💣'
const EMPTY = ''
var gSize = 4


function initGames(){
    gGame.shownCount = 0
    gGame.isOn = true
    gBoard = buildBoard();
    placeCells(gBoard)
    placeBomb(gBoard)
    countBombs(gBoard)
    renderBoard(gBoard)
    console.table(gBoard);
    var elGameOver = document.querySelector(".gameover") 
    console.log(elGameOver);
    elGameOver.style.display = 'none'

    
}

function buildBoard(){
    var mat = []
    for (var i = 0; i < gSize; i++) {
        var row = []
        for (var j = 0; j < gSize; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function placeCells(board){
    for(var i = 0;i<board.length;i++){
        for(var j = 0;j<board[0].length;j++){
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

function placeBomb(board){
    var randomNum = getRandomInt(0,board.length-1)
    console.log(randomNum);
    for(var i = 0;i<board.length;i++){
        for(var j = 0;j<board[0].length;j++){
            // console.log('hi');
            console.log();
            board[randomNum][3].isMine = true 
            board[0][randomNum].isMine = true
            // console.log(board[2][3]);
        }
    }
    return board
}

function countBombs(board){
    for(var i = 0;i<board.length;i++){
        for(var j = 0;j<board[0].length;j++){
            var currCell = board[i][j]
            currCell.minesAroundCount = setMinesNegsCount(board,i,j)
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

function renderBoard(board){
    var strHTML = ''
    for(var i = 0;i<board.length;i++){
        strHTML+=`<tr>\n`
        for(var j = 0;j<board[0].length;j++){
            var currCell = board[i][j]
            // console.log(currCell);
            var cellClass;
            if (currCell.isMine === true) cellClass = 'mine';
            else cellClass = 'empty';
            strHTML += `\t<td class="${cellClass}
            " onclick="reveal(this,${i},${j}) " >\n`;
            
            if(currCell.isMine ===true&&currCell.isShown === true){
                strHTML+=Mine
            }else if(currCell.isShown===true&&currCell.isMine===false){

             strHTML+=currCell.minesAroundCount
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    // console.log(strHTML);
    var elBoard = document.querySelector(".board")
    console.log(elBoard);
    elBoard.innerHTML = strHTML
}



function reveal(elCell,i,j) {
    if(gGame.isOn===true){
    console.log('hi');
    console.log(elCell);
    
    if (elCell.classList.contains('mine')) {
        gGame.shownCount++
        console.log(gGame.shownCount);
        gBoard[i][j].isShown = true
        renderBoard(gBoard)
        gameOver()
        gGame.isOn = false
    }else{
        gGame.shownCount++
        gBoard[i][j].isShown = true
        renderBoard(gBoard)
        console.log(gBoard[i][j]);
    } 
}
}

function gameOver() {
    var elModal = document.querySelector(".gameover")
    console.log(elModal);
    elModal.style.display = 'block'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min+1) + min); //The maximum is exclusive and the minimum is inclusive
  }