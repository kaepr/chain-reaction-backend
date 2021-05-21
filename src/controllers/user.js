import createError from 'http-errors';

import User from '../models/User';
import logger from '../utils/logger';

export const getCurrentUserData = async (req, res, next) => {
  try {
    const userId = req.payload.aud;
    console.log('USER ID', userId);
    const user = await User.findById(userId);
    if (!user) {
      throw createError.NotFound('User does not exist');
    }

    res.json({
      userData: user,
    });
  } catch (err) {
    next(err);
  }
};

export const uerDataTest = async (req, res, next) => {
  try {
    const userId = req.payload;
  } catch (err) {
    next(err);
  }
};
