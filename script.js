const GRID_SIZE = 6

let level = "Easy"
document.getElementById("currLevel").innerHTML = level


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

let grid = [GRID_SIZE]

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
    displayGrid()
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

function displayGrid(){
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

function clickCell(row, col){
    if(!grid[row][col].isClicked){
        grid[row][col].click()
    }

    if(grid[row][col].hasBomb){
        document.getElementById(`button${row}:${col}`).style.backgroundColor = "red"
        gameOver()
    }
    else{
        document.getElementById(`button${row}:${col}`).style.backgroundColor = "green"
    }
}

function gameOver(){
    for(let i = 0; i< GRID_SIZE; i++){
        for(let j = 0; j<GRID_SIZE; j++){
            let cell = document.getElementById(`button${i}:${j}`)
            cell.disabled = "disabled"
            setTimeout(function() {
                if(grid[i][j].hasBomb){
                    cell.style.backgroundColor = "red"
                }
            }, 1000);
            
        }
    }

    let result = document.getElementById("result")
    result.innerHTML = "BOOM! YOU HIT A BOMB AND LOST!"
    result.style.color = "red"
}

fillGrid()

