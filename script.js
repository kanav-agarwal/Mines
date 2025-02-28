const GRID_SIZE = 6
const EASY = 1
const MEDIUM = 2
const HARD = 4
const EXTRAHARD = 6

var balance = 500
document.getElementById('balanceAmount').innerHTML = `$${balance}`

let level = "Easy"
document.getElementById("currLevel").innerHTML = level

let explosionAudio = document.getElementById("boom")

let grid = [GRID_SIZE]

let tempBalance = 0

class Cell{
    constructor(){
        this.hasBomb = false
        this.isClicked = false
    }
    
    setBomb(){
        this.hasBomb = true
    }

    click(){
        this.isClicked =  true
    }
}


function changeMode(){
    level = document.getElementById("level").value
    document.getElementById("currLevel").innerHTML = level
    document.getElementById("result").innerHTML = ""
    if(confirm(`Do you wanna start a new ${level.toUpperCase()} game?`) && balance >= 30){
        balance -= 30
        document.getElementById('balanceAmount').innerHTML = `$${balance}`
        document.getElementById('grid').style.display = 'block'
        document.getElementById('levelDisplay').style.display = 'block'
        fillGrid()  
    }
}

function fillGrid(){
    for(let i = 0; i < GRID_SIZE; i++){
        grid[i] = []
        for(let j = 0; j < GRID_SIZE; j++){
            grid[i][j] = new Cell()
        }
    }

    if(level === "Easy"){
        setBombs(EASY)
    }
    else if(level === "Medium"){
        setBombs(MEDIUM)
    }
    else if(level === "Hard"){
        setBombs(HARD)
    }
    else{
        setBombs(EXTRAHARD)
    }

    let html = ``
    for(let i = 0; i < GRID_SIZE; i++){
        html += `<tr>`
        for(let j = 0; j < GRID_SIZE; j++){
            html += `<td><button class="cell" id="button${i}:${j}" onclick="clickCell(${i}, ${j})"></button></td>`
        }
        html += `</tr>`
    }

    document.getElementById("grid").innerHTML = html  
}

function setBombs(count){
    for(let i = 0; i < count; i++){
        let row = Math.floor(Math.random() * GRID_SIZE)
        let col = Math.floor(Math.random() * GRID_SIZE)
        if(grid[row][col].hasBomb){
            i--
        }
        grid[row][col].setBomb()
    }
}

function addMoney(){
    if(level === "Easy"){
        tempBalance += EASY
        balance += EASY
    } else if(level === "Medium"){
        tempBalance += MEDIUM
        balance += MEDIUM
    } else if(level === "Hard"){
        tempBalance += HARD
        balance += HARD
    } else{
        tempBalance += EXTRAHARD
        balance += EXTRAHARD
    }
    document.getElementById('balanceAmount').innerHTML = `$${balance}`
}

function clickCell(row, col){
    if(!grid[row][col].isClicked){
        grid[row][col].click()

        let cell = document.getElementById(`button${row}:${col}`)

        if(grid[row][col].hasBomb){
            cell.style.backgroundColor = "red"
            cell.style.backgroundImage = "url(media/mine.png)"
            explosionAudio.play()
            gameLost()
        }
        else{
            cell.style.backgroundImage = "url(media/gem.png)"
            addMoney()
        }
    }
}

function gameLost(){
    for(let i = 0; i< GRID_SIZE; i++){
        for(let j = 0; j<GRID_SIZE; j++){
            let cell = document.getElementById(`button${i}:${j}`)
            cell.disabled = "disabled"
            setTimeout(function() {
                if(grid[i][j].hasBomb){
                    cell.style.backgroundColor = "red"
                    cell.style.backgroundImage = "url(media/mine.png)"
                } 
                else{
                    cell.style.backgroundColor = "rgb(18, 88, 24)"
                }
            }, 1000); 
        }
    }

    balance -= tempBalance
    document.getElementById('balanceAmount').innerHTML = `$${balance}`
    tempBalance = 0

    let result = document.getElementById("result")
    result.innerHTML = "BOOM! YOU HIT A MINE AND LOST!"
    result.style.color = "red"
}