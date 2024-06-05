//Model

const gameValues = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  
  const isBoxEmpty = (i, j) => {
    return gameValues[i][j] === 0;
  };
  
  const generateRandomPosition = () => {
    return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
  };
  
  //Used to select 2 or 4 randomly for populating the matrix
  const generateRandomInitialValue = () => {
    return Math.random() > 0.5 ? 2 : 4;
  };
  
  const resetGameModel = () => {
    for (let i = 0; i < gameValues.length; i++) {
      for (let j = 0; j < gameValues[i].length; j++) {
        gameValues[i][j] = 0;
      }
    }
  
    for (let i = 0; i < 2; i++) {
      let [x, y] = generateRandomPosition();
      while (!isBoxEmpty(x, y)) {
        [x, y] = generateRandomPosition();
      }
      gameValues[x][y] = generateRandomInitialValue();
    }
  
    console.log(gameValues);
  };
  
  const setMatrixAfterMove = (direction) => {
      const logDirection = {
          right: "Right",
          left: "Left",
          up: "Up",
          down: "Down"
      };
  
      const updateRowCol = (arr) => {
          let currNum = 0;
          let newArr = [];
  
          arr.forEach(value => {
              if (value !== 0) {
                  if (currNum === 0) {
                      currNum = value;
                  } else if (currNum === value) {
                      newArr.push(currNum * 2);
                      score += (currNum * 2);
                      currNum = 0;
                  } else {
                      newArr.push(currNum);
                      currNum = value;
                  }
              }
          });
  
          if (currNum !== 0) {
              newArr.push(currNum);
          }
  
          while (newArr.length < 4) {
              newArr.unshift(0);
          }
  
          return newArr;
      };
  
      const transform = {
          right: (row) => row.slice().reverse(),
          left: (row) => row.slice(),
          up: (col) => col.slice().reverse(),
          down: (col) => col.slice()
      };
  
      const updateGameValues = (isRow, index, newArr) => {
          if (isRow) {
              gameValues[index] = newArr;
          } else {
              for (let i = 0; i < 4; i++) {
                  gameValues[i][index] = newArr[i];
              }
          }
      };
  
      console.log(logDirection[direction]);
  
      const isRow = direction === "right" || direction === "left";
      for (let i = 0; i < 4; i++) {
          let arr = isRow ? gameValues[i] : gameValues.map(row => row[i]);
          let transformedArr = transform[direction](arr);
          let newArr = updateRowCol(transformedArr);
          if (direction === "right" || direction === "up") newArr.reverse();
          updateGameValues(isRow, i, newArr);
      }
  };
  
  
  //The game will end when for each element in the 2D array, no element has the same value as its adjacent element. (Because if it did then we
  //could combine them and the game would continue.
  const isGameEnd = () => {
      for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
              const value = gameValues[row][col];
              if (
                  (row > 0 && gameValues[row - 1][col] === value) ||
                  (row < 3 && gameValues[row + 1][col] === value) ||
                  (col > 0 && gameValues[row][col - 1] === value) ||
                  (col < 3 && gameValues[row][col + 1] === value)
              ) {
                  return false;
              }
          }
      }
      return true;
  };
  
  
  const setRandomValueAfterMove = (zeroPositions, countOfZeros) => {
    let randomIndex = Math.floor(Math.random() * countOfZeros);
    let [x, y] = zeroPositions[randomIndex];
    gameValues[x][y] = generateRandomInitialValue();
  };
  
  //This function is used to see if the matrix is already full or not. If it is not full i.e., the count of zeros is not 0, then we will populate
  //a random position with a 2 or 4.
  
  //If there are no zeros, then we will check if the game is over or not. If it is over, then we will call the showGameOver function. If it is not over,
  //then we will call the setMatrixAfterMove function as tehre is no space to populate a new number.
  const getZeroPositions = () => {
    let zeroPositions = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (gameValues[i][j] === 0) {
          zeroPositions.push([i, j]);
        }
      }
    }
  
    return zeroPositions;
  };
  
  const gameLogic = (direction) => {
    setMatrixAfterMove(direction);
    setTimeout(100000);
    let zeroPositions = getZeroPositions();
    let countOfZeros = zeroPositions.length;
    if (countOfZeros === 0) {
      if (isGameEnd()) {
        showGameOver();
      }
    } else {
      setRandomValueAfterMove(zeroPositions, countOfZeros);
    }
  };
  
  //View
  
  const setGameBoard = (gameValues) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (gameValues[i][j] === 0) {
          gameMatrix[i][j].innerText = "";
        } else {
          gameMatrix[i][j].innerText = gameValues[i][j];
        }
      }
    }
  };
  
  const showGameOver = () => {
    alert("Game Over");
  };
  
  const setScore = (score) => {
    console.log("score is: ", score);
    scoreDisplay.innerText = `Score: ${score}`;
  };
  
  const setButtonText = () => {
    startAndReset.innerText = "Reset";
  };
  
  //Controller
  
  let score;
  const scoreDisplay = document.querySelector(".score");
  
  const helperLogger = () => {
    for (let i = 0; i < 4; i++) {
      console.log(gameValues[i]);
    }
  };
  
  const convertToMatrix = (arr, cols) => {
    const matrix = [];
    let row = [];
    arr.forEach((item, index) => {
      row.push(item);
      if (row.length === cols) {
        matrix.push(row);
        row = [];
      }
    });
    if (row.length > 0) {
      matrix.push(row);
    }
    return matrix;
  };
  
  const boxes = document.querySelectorAll(".box");
  const startAndReset = document.querySelector(".startAndReset");
  const gameMatrix = convertToMatrix(boxes, 4);
  
  const gameReset = () => {
    resetGameModel();
    setGameBoard(gameValues);
    score = 0;
    setButtonText();
    setScore(score);
  };
  
  startAndReset.addEventListener("click", gameReset);
  
  const directionMap = {
    ArrowRight: "right",
    ArrowLeft: "left",
    ArrowUp: "up",
    ArrowDown: "down",
  };
  
  document.addEventListener("keydown", (event) => {
    const direction = directionMap[event.key];
    if (direction) {
      gameLogic(direction);
      helperLogger();
      setGameBoard(gameValues);
      setScore(score);
    }
  });