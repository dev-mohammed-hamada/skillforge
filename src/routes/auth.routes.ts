import express, { RequestHandler } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerUser as RequestHandler);
router.post('/login', loginUser as RequestHandler);
router.post('/logout', logoutUser as RequestHandler);

export default router;
