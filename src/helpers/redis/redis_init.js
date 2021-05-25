import redis from 'redis';
import logger from '../../utils/logger';

// in prod
const client = redis.createClient({
  url: process.env.REDIS_URL,
  // port: 6379,
  // host: '127.0.0.1',
});

// in dev
/**
 * 
 * const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
});
 * 
 * 
 */

client.on('connect', () => {
  logger.info('Client connected to redis...');
});

client.on('ready', () => {
  logger.info('Client connected to redis and ready to use...');
});

client.on('error', (err) => {
  logger.warn(err.message);
});

client.on('end', () => {
  logger.warn('Client disconnected from redis');
});

process.on('SIGINT', () => {
  client.quit();
});

module.exports = client;
