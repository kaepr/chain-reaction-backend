import express from 'express';
import dotenv from 'dotenv';
import expressPino from 'express-pino-logger';
import CreateError from 'http-errors';
import cors from 'cors';

// Local imports
import connectDB from './database/db';
import logger from './utils/logger';

// Sets logger middlware
const expressLogger = expressPino({ logger });

// Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

// Sets env file
dotenv.config();

// Connects to database and redis
connectDB();
require('./helpers/redis/redis_init');

const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:5000'];
const corsOptions = {
  origin(origin, cb) {
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(expressLogger);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use(async (req, res, next) => {
  next(CreateError.NotFound());
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
