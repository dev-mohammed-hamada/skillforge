import express, { RequestHandler } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from '../controllers/goals.controller';

const router = express.Router();

router.use(requireAuth as RequestHandler);

router.post('/', createGoal as RequestHandler);
router.get('/', getAllGoals as RequestHandler);
router.get('/:id', getGoalById as RequestHandler);
router.put('/:id', updateGoal as RequestHandler);
router.delete('/:id', deleteGoal as RequestHandler);

export default router;
