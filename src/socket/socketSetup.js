/* eslint-disable no-console */
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import logger from '../utils/logger';
import { verifyRefreshToken } from '../helpers/token/token_validation';

const verifyUser = (socket, next) => {
  console.log('in auth middleware socket = ', socket);
  if (socket.handshake.auth.token) {
    const { token } = socket.handshake.auth;
    const userId = verifyRefreshToken(token);
    // eslint-disable-next-line no-param-reassign
    socket.userId = userId;
    next();
  }
};

function socketInstance(app) {
  const io = new Server(app, {
    // path: '/chain-reaction',
    transports: ['websocket', 'polling'],
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // origins: ['http://localhost:3000', 'https://admin.socket.io'],
  });

  const chainReaction = io.of('/chain-reaction');
  console.log('Socket IO started');
  // console.log('io ', io);

  io.on('connection', (socket) => {
    console.log('socket connection handled', socket.handshake.query);
    console.log('socket connection id = ', socket.id);
    // console.log('socket connection id = ', socket.query);
    io.emit('init', { data: 'Hello from socket' });
  });

  // chainReaction.on('connection', async (socket) => {
  //   console.log('inside socket ', socket);
  //   logger.info('Socket info = ', socket);
  //   // const {} = socket.handshake.query;
  // });

  instrument(io, {
    auth: false,
  });

  return io;
}

export default socketInstance;
