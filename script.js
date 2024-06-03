//Model

const gameValues = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

let isBoxEmpty = (i,j) => {
    return gameValues[i][j] === 0;
}

let randomNumberGeneratorBetween03 = () => {
    return Math.floor(Math.random() * 4);
};

let randomPositionGenerator = () => {
    let x = randomNumberGeneratorBetween03();
    let y = randomNumberGeneratorBetween03();
    return [x, y];
};

//Used to select 2 or 4 randomly for populating the matrix
let Select2Or4 = () => {
    return Math.random() > 0.5 ? 2 : 4;
};

let resetGameModel = () => {
    for (let i = 0; i < gameValues.length; i++) {
        for (let j = 0; j < gameValues[i].length; j++) {
            gameValues[i][j] = 0;
        }
    }

    for (let i = 0; i < 2; i++) {
        let [x, y] = randomPositionGenerator();
        while (!isBoxEmpty(x, y)) {
            [x, y] = randomPositionGenerator();
        }
        gameValues[x][y] = Select2Or4();
    }

    console.log(gameValues);
};


let gLMove = (direction) => {
    if (direction === "right") {
        console.log("Right");
        for (let row = 0; row < 4; row++) {
            let currNum = 0;
            let newRow = [];
        
            for (let col = 0; col < 4; col++) {
                let value = gameValues[row][col];
                if (value !== 0) {
                    if (currNum === 0) {
                        currNum = value;
                    } 
                    else if (currNum === value) {
                        newRow.push(currNum * 2);
                        console.log("currNum is: ", currNum);
                        console.log("score is: ", score);
                        score += (currNum*2);
                        currNum = 0;
                    } 
                    else {
                        newRow.push(currNum);
                        currNum = value;
                    }
                }
            }
            
            if (currNum !== 0) {
                newRow.push(currNum);
            }
            
            while (newRow.length < 4) {
                newRow.unshift(0);
            }
        
            gameValues[row] = newRow.slice(); //assigns the new row to the gameValues
        }        
    }

    if (direction === "left") {
        console.log("Left");
        for (let row = 0; row < 4; row++) {
            let currNum = 0;
            let newRow = [];
        
            for (let col = 3; col >= 0; col--) {
                let value = gameValues[row][col];
                if (value !== 0) {
                    if (currNum === 0) {
                        currNum = value;
                    } 
                    else if (currNum === value) {
                        newRow.unshift(currNum * 2);
                        score += (currNum*2);
                        currNum = 0;
                    } 
                    else {
                        newRow.unshift(currNum);
                        currNum = value;
                    }
                }
            }
            
            if (currNum !== 0) {
                newRow.unshift(currNum);
            }
            
            while (newRow.length < 4) {
                newRow.push(0);
            }
        
            gameValues[row] = newRow.slice(); //assigns the new row to the gameValues
        }        
    }

    if (direction === "up") {
        console.log("Up");
        for (let col = 0; col < 4; col++) {
            let currNum = 0;
            let newCol = [];
        
            for (let row = 3; row >= 0; row--) {
                let value = gameValues[row][col];
                if (value !== 0) {
                    if (currNum === 0) 
                        {
                        currNum = value;
                        } 
                    else if (currNum === value) {
                        newCol.unshift(currNum * 2);
                        score += (currNum*2);
                        currNum = 0;
                        } 
                    else {
                        newCol.unshift(currNum);
                        currNum = value;
                        }
                }
            }
            
            if (currNum !== 0) 
                {
                    newCol.unshift(currNum);
                }
            
            while (newCol.length < 4) 
                {
                    newCol.push(0);
                }
        
            for (let row = 0; row < 4; row++) 
                {
                    gameValues[row][col] = newCol[row];
                }
        }        
    }

    if (direction === "down") {
        console.log("Down");
        for (let col = 0; col < 4; col++) 
        {
            let currNum = 0;
            let newCol = [];
        
            for (let row = 0; row < 4; row++) 
            {
                let value = gameValues[row][col];
                if (value !== 0) {
                    if (currNum === 0) 
                    {
                        currNum = value;
                    } 
                    else if (currNum === value) 
                    {
                        newCol.push(currNum * 2);
                        score += (currNum * 2);
                        currNum = 0;
                    } 
                    else 
                    {
                        newCol.push(currNum);
                        currNum = value;
                    }
                }
            }
            
            if (currNum !== 0) 
            {
                newCol.push(currNum);
            }
            
            while (newCol.length < 4) 
            {
                newCol.unshift(0);
            }
        
            for (let row = 0; row < 4; row++) 
            {
                gameValues[row][col] = newCol[row];
            }
        }
    }
};

//The game will end when for each element in the 2D array, no element has the same value as its adjacent element. (Because if it did then we
//could combine them and the game would continue.
let gLEnd = () =>{
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const value = gameValues[row][col];

            // Check up
            if (row > 0 && gameValues[row - 1][col] === value) 
            {
                return true;
            }

            // Check down
            if (row < 3 && gameValues[row + 1][col] === value) 
            {
                return true;
            }

            // Check left
            if (col > 0 && gameValues[row][col - 1] === value)
            {
                return true;
            }

            // Check right
            if (col < 3 && gameValues[row][col + 1] === value) 
            {
                return true;
            }
        }
    }
    return false;
};

let gLPopulate = (zeroPositions, countOfZeros) => {
    let randomIndex = Math.floor(Math.random() * countOfZeros);
    let [x, y] = zeroPositions[randomIndex];
    gameValues[x][y] = Select2Or4();
};

//This function is used to see if the matrix is already full or not. If it is not full i.e., the count of zeros is not 0, then we will populate
//a random position with a 2 or 4.

//If there are no zeros, then we will check if the game is over or not. If it is over, then we will call the gameOver function. If it is not over,
//then we will call the gLMove function as tehre is no space to populate a new number.
let gLCounter = () =>{
    let zeroPositions = [];
    let countOfZeros = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameValues[i][j] === 0) 
            {
                zeroPositions.push([i, j]);
                countOfZeros++;
            }
        }
    }

    return [zeroPositions, countOfZeros];
}


let gameLogic = (direction) => {
    gLMove(direction);
    gLCounter;
    zeroPositions = gLCounter()[0];
    countOfZeros = gLCounter()[1];
    if (countOfZeros === 0) {
        if (gLEnd) 
        {
            gameOver();
        }
    } 
    else 
    {
        gLPopulate(zeroPositions, countOfZeros);
    }
};

//View

let gameBoardSetter = (gameValues) => {
    for (let i = 0 ; i<4 ; i++)
        {
            for (let j=0 ; j<4 ; j++)
                {
                    if (gameValues[i][j] === 0)
                        {
                            gameMatrix[i][j].innerText = "";
                        }
                    else
                        {
                            gameMatrix[i][j].innerText = gameValues[i][j];
                        }
                }
        } 
}

let gameOver = () => {
    alert("Game Over");
};

let scoreSetter = (score) => {
    console.log("score is: ", score)
    scoreDisplay.innerText = `Score: ${score}`;
};

let startToResetText = () => {
    startAndReset.innerText = "Reset";
};




//Controller

let score;
const scoreDisplay = document.querySelector(".score");

let helperLogger = () => {
    for (let i = 0 ; i<4 ; i++)
        {
            console.log(gameValues[i]);
        }
};

function convertToMatrix(arr, cols) {
    const matrix = [];
    let row = [];
    for (let i = 0; i < arr.length; i++) {
    row.push(arr[i]);
    if (row.length === cols) {
        matrix.push(row);
        row = [];
    }
    }
    if (row.length > 0) {
    matrix.push(row);
    }
    return matrix;
}

const boxes = document.querySelectorAll(".box");
const startAndReset = document.querySelector(".startAndReset")

const gameMatrix = convertToMatrix(boxes, 4);

let gameReset = () => {
    resetGameModel();
    gameBoardSetter(gameValues);
    score = 0;
    startToResetText();
    scoreSetter(score);
};

startAndReset.addEventListener("click", gameReset);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") 
    {
        gameLogic("right");
        helperLogger();
        gameBoardSetter(gameValues);
        scoreSetter(score);
    }
    if (event.key === "ArrowLeft") 
    {
        gameLogic("left");
        helperLogger(); 
        gameBoardSetter(gameValues);
        scoreSetter(score);
    }
    if (event.key === "ArrowUp") 
    {
        gameLogic("up");
        helperLogger();
        gameBoardSetter(gameValues);
        scoreSetter(score);
    }
    if (event.key === "ArrowDown") 
    {
        gameLogic("down");
        helperLogger();
        gameBoardSetter(gameValues);
        scoreSetter(score);
    }
});