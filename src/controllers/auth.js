import createError from 'http-errors';

import User from '../models/User';
import logger from '../utils/logger';
import { registerSchema, loginSchema } from '../helpers/validators/auth_schema';

import client from '../helpers/redis/redis_init';

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../helpers/token/token_validation';

export const register = async (req, res, next) => {
  try {
    const validated = await registerSchema.validate(req.body);
    // logger.info('info from validation ', validated);
    const userExists = await User.findOne({ email: validated.email });

    if (userExists) {
      throw createError.Conflict(
        `${validated.email} is already been registered `
      );
    }

    const user = new User(validated);
    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    logger.error('err : ', err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const validated = await loginSchema.validate(req.body);
    const user = await User.findOne({ email: validated.email });

    if (!user) {
      throw createError.NotFound('User not registered');
    }

    const isMatch = await user.isValidPassword(validated.password);

    if (!isMatch) {
      throw createError.Unauthorized('User credentials not valid');
    }

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const tokenRefresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken, refreshToken: refToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    client.DEL(userId, (err, val) => {
      if (err) {
        logger.error(err.message);
        throw createError.InternalServerError();
      }
      console.log(val);
      return res.sendStatus(204);
    });
  } catch (err) {
    next(err);
  }
};
