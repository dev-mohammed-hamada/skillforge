import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerUser as express.RequestHandler);
router.post('/login', loginUser as express.RequestHandler);
router.post('/logout', logoutUser as express.RequestHandler);

export default router;
