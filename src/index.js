import { app, server } from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});
