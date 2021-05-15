import express from 'express';
import dotenv from 'dotenv';
import expressPino from 'express-pino-logger';

// Local imports
import connectDB from './database/db';
import logger from './utils/logger';

// Sets logger middlware
const expressLogger = expressPino({ logger });

// Sets env file
dotenv.config();

// Connects to database
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(expressLogger);

app.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});
