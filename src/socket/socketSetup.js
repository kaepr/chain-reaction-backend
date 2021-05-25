/* eslint-disable no-console */
import { Server } from 'socket.io';
import { verifyRefreshToken } from '../helpers/token/token_validation';
import gameHandler from './gameHandler';

const verifyUser = async (socket, next) => {
  try {
    if (socket.handshake.query) {
      const { token } = socket.handshake.query;
      const userId = await verifyRefreshToken(token);
      // eslint-disable-next-line no-param-reassign
      socket.userId = userId;
      next();
    }
  } catch (err) {
    console.log('user not verified');
    next(err);
  }
};

function socketInstance(app) {
  const io = new Server(app, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // origins: ['http://localhost:3000', 'https://admin.socket.io'],
  });

  console.log('Socket IO started');

  const onConnection = async function socketHandler(socket) {
    console.log('user id ', socket.userId);
    console.log('socket connection id = ', socket.id);

    gameHandler(io, socket);
  };

  io.use(verifyUser).on('connection', onConnection);

  return io;
}

export default socketInstance;
