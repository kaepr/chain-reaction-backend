/* eslint-disable no-console */
import { Server } from 'socket.io';
import { verifyRefreshToken } from '../helpers/token/token_validation';
import gameHandler from './gameHandler';
import { NOT_AUTHORIZED } from './socketEvents';

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
    socket.emit(NOT_AUTHORIZED, 'If you face any errors, login and try again');
    const errMsg = new Error('Not authorized');
    errMsg.data = { content: 'Please try again after logging again' };
    next(errMsg);
  }
};

function socketInstance(app) {
  const io = new Server(app, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // origins: ['http://localhost:3000', 'https://admin.socket.io'],
  });

  const onConnection = async function socketHandler(socket) {
    gameHandler(io, socket);
  };

  io.use(verifyUser).on('connection', onConnection);

  return io;
}

export default socketInstance;
