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
    errMsg.data = { content: 'Try again after logging again.' };
    next(errMsg);
  }
};

function socketInstance(app) {
  let url = 'http://localhost:3000';

  if (process.env.NODE_ENV === 'production') {
    url = 'https://chain-reaction-online.netlify.app';
  }

  const io = new Server(app, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const onConnection = async function socketHandler(socket) {
    gameHandler(io, socket);
  };

  io.use(verifyUser).on('connection', onConnection);

  return io;
}

export default socketInstance;
