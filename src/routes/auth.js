import express from 'express';
import { register, login, tokenRefresh, logout } from '../controllers/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', tokenRefresh);
router.delete('/logout', logout);

module.exports = router;
