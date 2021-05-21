import express from 'express';
import { getCurrentUserData } from '../controllers/user';

import { verifyAccessToken } from '../middlewares';

const router = express.Router();
router.get('/me', verifyAccessToken, getCurrentUserData);

module.exports = router;
