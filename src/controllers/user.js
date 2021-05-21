import createError from 'http-errors';

import User from '../models/User';
import logger from '../utils/logger';

export const getCurrentUserData = async (req, res, next) => {
  try {
    const userId = req.payload.aud;
    const user = await User.findById(userId).select('-password');
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
    res.json({
      yes: 'yes',
    });
  } catch (err) {
    next(err);
  }
};
