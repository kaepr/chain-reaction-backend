/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { nanoid } from 'nanoid';

import {
  initBoardData,
  changePlayer,
  checkWinner,
  handleClick,
} from '../utils/gameFunctions/gameFunctions';

import * as EVENT from './socketEvents';

let users = [];
const gameState = {};
const clientRooms = {};
const whoseTurn = {};

async function gameHandler(io, socket) {
  const joinServer = () => {
    const user = socket.id;
    users.push(user);
    socket.emit(EVENT.NEW_USER, 'Connected to game Server');
  };

  const leftRoom = () => {
    const tempUsers = users.filter((x) => x !== socket.id);
    users = tempUsers;
    console.log('all users = ', users);
  };

  const startGameBoard = (roomName) => {
    gameState[roomName] = initBoardData();
    whoseTurn[roomName] = 1;

    io.in(roomName).emit(EVENT.GAME_DATA, gameState[roomName]);
    io.in(roomName).emit(EVENT.TURN, whoseTurn[roomName]);
  };

  const handlePlayerInput = (data) => {
    const { playerTurn, x, y } = data;
    console.log('x,y,turn = ', x, y, playerTurn);

    const roomName = clientRooms[socket.id];

    const earlyCheck = checkWinner(gameState[roomName]);

    // Checking if the board has been completed or not, to cancel this request
    if (earlyCheck !== 0) {
      return;
    }

    const turn = whoseTurn[roomName];
    if (!roomName) {
      return;
    }

    if (turn === socket.number) {
      // current player turns
      gameState[roomName] = handleClick(x, y, playerTurn, gameState[roomName]);
      const winCheck = checkWinner(gameState[roomName]);

      if (winCheck !== 0) {
        // Player has won
        // socket.emit('gameLog', `Player ${winCheck} Won`);
        io.in(roomName).emit(EVENT.GAME_DATA, gameState[roomName]);
        io.in(roomName).emit(EVENT.TURN, whoseTurn[roomName]);
        io.in(roomName).emit(EVENT.IS_WINNER, winCheck);
        return;
      }

      // Change player
      const nextPlayer = changePlayer(turn);
      if (nextPlayer === 0) {
        // Invalid change player
        // Break game here
        socket.emit(EVENT.UNKNOWN_ERROR, {
          errorMsg: 'Error occured. Please try again with a new game',
        });
      }
      whoseTurn[roomName] = nextPlayer;
      // Emit messages indicitating next player is now able to turn
      io.in(roomName).emit('gameData', gameState[roomName]);
      io.in(roomName).emit('turn', whoseTurn[roomName]);
    } else if (turn !== socket.number) {
      // Incorrect players tries to move
      // socket.emit('gameLog', 'Only the correct player should move');
    }
  };

  const handleJoinGame = (roomName) => {
    const room = io.sockets.adapter.rooms;
    const allUsers = room.get(roomName);

    let numClients = 0;
    if (allUsers) {
      numClients = allUsers.size;
    }

    if (numClients === 0) {
      socket.emit(EVENT.UNKNOWN_CODE, {
        errorMsg:
          'No such Room exists. Please crosscheck the room id or make a new one',
      });
      return;
    }

    if (numClients >= 2) {
      socket.emit(EVENT.ROOM_FULL, {
        errorMsg: 'Room already has enough users. Make or join another room',
      });
      return;
    }

    clientRooms[socket.id] = roomName;

    socket.join(roomName);
    socket.number = 2;
    socket.emit(EVENT.INIT, 2);

    startGameBoard(roomName);
  };

  const handleNewGame = () => {
    const roomName = nanoid(10);
    clientRooms[socket.id] = roomName;
    socket.emit(EVENT.GAME_CODE, roomName);

    gameState[roomName] = initBoardData();
    socket.join(roomName);

    socket.number = 1;
    socket.emit(EVENT.INIT, 1);
  };

  socket.on(EVENT.NEW_GAME, handleNewGame);
  socket.on(EVENT.JOIN_SERVER, joinServer);
  socket.on(EVENT.JOIN_GAME, handleJoinGame);
  // socket.on(EVENT.LEFT_ROOM, leftRoom);
  socket.on(EVENT.PLAYER_INPUT, handlePlayerInput);
  socket.on('disconnect', leftRoom);
}

export default gameHandler;
