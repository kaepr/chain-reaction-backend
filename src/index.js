import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});
