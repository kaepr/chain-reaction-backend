/* eslint-disable consistent-return */
import JWT from 'jsonwebtoken';
import createError from 'http-errors';

const verifyAccessToken = (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization) return next(createError.Unauthorized());
  console.log('YES');
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

export default verifyAccessToken;
