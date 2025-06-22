import express from 'express';
import { AuthRequest, requireAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/me', requireAuth, (req: AuthRequest, res: express.Response) => {
  res.json({ message: 'Hello from protected route', userId: req.userId });
});

export default router;
