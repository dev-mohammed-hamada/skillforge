import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from '../controllers/goals.controller';

const router = express.Router();

router.use(requireAuth);

router.post('/', createGoal);
router.get('/', getAllGoals);
router.get('/:id', getGoalById);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
