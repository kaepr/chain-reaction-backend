/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
export const HEIGHT = 10;
export const WIDTH = 6;

export const createDefaultBoard = () => {
  const bData = [];
  for (let i = 0; i < HEIGHT; i++) {
    bData.push([]);
    for (let j = 0; j < WIDTH; j++) {
      bData[i][j] = {
        x: i,
        y: j,
        val: 0,
        owner: 0,
      };
    }
  }
  return bData;
};

export const initBoardData = () => {
  const data = createDefaultBoard();
  return data;
};

export const handleBurst = (x, y, playerTurn, boardData) => {
  const updatedData = boardData;
  updatedData[x][y].owner = playerTurn;

  if (updatedData[x][y].val < checkBurstLimit(x, y)) {
    updatedData[x][y].val += 1;
  } else {
    // setting current cell to null state
    updatedData[x][y].val = 0;
    updatedData[x][y].owner = 0;
    // Recursivly call on children
    incrementNeighbours(x, y, playerTurn, updatedData);
  }

  return updatedData;
};

export const incrementNeighbours = (x, y, playerTurn, boardData) => {
  if (x === 0 || x === HEIGHT - 1 || y === 0 || y === WIDTH - 1) {
    if (x === y && x === 0) {
      // top left corners
      handleBurst(x + 1, y, playerTurn, boardData);
      handleBurst(x, y + 1, playerTurn, boardData);
    } else if (x === 0 && y === WIDTH - 1) {
      // top right corners
      handleBurst(x + 1, y, playerTurn, boardData);
      handleBurst(x, y - 1, playerTurn, boardData);
    } else if (x === HEIGHT - 1 && y === 0) {
      // bottom left corners
      handleBurst(x - 1, y, playerTurn, boardData);
      handleBurst(x, y + 1, playerTurn, boardData);
    } else if (x === HEIGHT - 1 && y === WIDTH - 1) {
      // bottom right corners
      handleBurst(x, y - 1, playerTurn, boardData);
      handleBurst(x - 1, y, playerTurn, boardData);
    } else if (x === 0) {
      // top row
      handleBurst(x, y + 1, playerTurn, boardData);
      handleBurst(x, y - 1, playerTurn, boardData);
      handleBurst(x + 1, y, playerTurn, boardData);
    } else if (x === HEIGHT - 1) {
      // bottom row
      handleBurst(x, y + 1, playerTurn, boardData);
      handleBurst(x, y - 1, playerTurn, boardData);
      handleBurst(x - 1, y, playerTurn, boardData);
    } else if (y === 0) {
      // leftmost row
      handleBurst(x + 1, y, playerTurn, boardData);
      handleBurst(x - 1, y, playerTurn, boardData);
      handleBurst(x, y + 1, playerTurn, boardData);
    } else if (y === WIDTH - 1) {
      // rightmost row
      handleBurst(x + 1, y, playerTurn, boardData);
      handleBurst(x - 1, y, playerTurn, boardData);
      handleBurst(x, y - 1, playerTurn, boardData);
    }
  } else {
    handleBurst(x - 1, y, playerTurn, boardData);
    handleBurst(x + 1, y, playerTurn, boardData);
    handleBurst(x, y - 1, playerTurn, boardData);
    handleBurst(x, y + 1, playerTurn, boardData);
  }
};

export const checkBurstLimit = (x, y) => {
  let limit = 0;
  if (x === 0 || x === HEIGHT - 1 || y === 0 || y === WIDTH - 1) {
    // all 4 corners
    if (
      (x === y && x === 0) ||
      (x === 0 && y === WIDTH - 1) ||
      (x === HEIGHT - 1 && y === 0) ||
      (x === HEIGHT - 1 && y === WIDTH - 1)
    ) {
      limit = 1;
    } else if (x === 0 || x === HEIGHT - 1 || y === 0 || y === WIDTH - 1) {
      // all edges except corner
      limit = 2;
    }
  } else {
    limit = 3;
  }
  return limit;
};

export const changePlayer = (playerTurn) => {
  if (playerTurn === 1) {
    return 2;
  }
  if (playerTurn === 2) {
    return 1;
  }
  return 0;
};

export const checkWinner = (boardData) => {
  const grid = boardData;
  let p1Count = 0;
  let p2Count = 0;
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (grid[i][j].owner === 1) {
        p1Count += 1;
      } else if (grid[i][j].owner === 2) {
        p2Count += 1;
      }
    }
  }

  const cnt = p1Count + p2Count;

  if (cnt > 1) {
    if (p1Count === 0) {
      return 2;
    }
    if (p2Count === 0) {
      return 1;
    }
  }

  return 0;
};

export const handleClick = (x, y, playerTurn, boardData) => {
  const clickedOwner = boardData[x][y].owner;
  if (clickedOwner === playerTurn || clickedOwner === 0) {
    // valid turn
    const updatedData = handleBurst(x, y, playerTurn, boardData);
    changePlayer(playerTurn);
    checkWinner(updatedData);
    return updatedData;
  }
  return [];
};
