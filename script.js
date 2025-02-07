const GRID_SIZE = 6

let level = "Easy"
document.getElementById("currLevel").innerHTML = level

let grid = [GRID_SIZE]

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
    fillGrid()
}

function fillGrid(){
    for(let i = 0; i < GRID_SIZE; i++){
        grid[i] = []
        for(let j = 0; j < GRID_SIZE; j++){
            grid[i][j] = new Cell()
        }
    }

    if(level === "Easy"){
        setBombs(1)
    }
    else if(level === "Medium"){
        setBombs(2)
    }
    else if(level === "Hard"){
        setBombs(4)
    }
    else{
        setBombs(6)
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

function clickCell(row, col){
    grid[row][col].click()

    let element = document.getElementById(`button${row}:${col}`)

    if(grid[row][col].hasBomb){
        element.style.backgroundColor = "red"
        gameLost()
    }
    else{
        element.style.backgroundImage = "url(gem.png)"
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
                } 
                else{
                    cell.style.backgroundColor = "rgb(18, 88, 24)"
                }
            }, 1000); 
        }
    }

    let result = document.getElementById("result")
    result.innerHTML = "BOOM! YOU HIT A MINE AND LOST!"
    result.style.color = "red"
}

fillGrid()