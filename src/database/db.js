import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async () => {
  let connString;
  if (process.env.NODE_ENV === 'development') {
    connString = process.env.MONGO_URI_STRING_DEV;
  } else if (process.env.NODE_ENV === 'test') {
    connString = process.env.MONGO_URI_STRING_TEST;
  }

  try {
    const conn = await mongoose.connect(connString, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`Connected to Mongo ${conn.connection.host}`);
  } catch (err) {
    logger.error(err);
  }
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connectDB;
