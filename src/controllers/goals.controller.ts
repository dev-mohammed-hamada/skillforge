import { Response } from 'express';
import {
  createGoalSchema,
  updateGoalSchema,
} from '../validators/goals.validator';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createGoal = async (req: AuthRequest, res: Response) => {
  const parsed = createGoalSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });

  const goal = await prisma.learningGoal.create({
    data: {
      ...parsed.data,
      userId: req.userId!,
    },
  });

  res.status(201).json(goal);
};

export const getAllGoals = async (req: AuthRequest, res: Response) => {
  const goals = await prisma.learningGoal.findMany({
    where: {
      userId: req.userId,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(goals);
};

export const getGoalById = async (req: AuthRequest, res: Response) => {
  const goal = await prisma.learningGoal.findFirst({
    where: { userId: req.userId, id: req.params.id },
  });

  if (!goal) return res.status(404).json({ message: 'Goal not found' });

  res.json(goal);
};

export const updateGoal = async (req: AuthRequest, res: Response) => {
  const parsed = updateGoalSchema.safeParse({
    ...req.body,
    progress: parseInt(req.body.progress) || undefined,
  });
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });

  const goal = await prisma.learningGoal.findFirst({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!goal) return res.status(404).json({ message: 'Goal not found' });

  const updated = await prisma.learningGoal.update({
    where: { id: goal.id },
    data: parsed.data,
  });

  res.json(updated);
};

export const deleteGoal = async (req: AuthRequest, res: Response) => {
  const goal = await prisma.learningGoal.findFirst({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!goal) return res.status(404).json({ message: 'Goal not found' });

  await prisma.learningGoal.delete({ where: { id: goal.id } });

  res.json({ message: 'Goal deleted successfully' });
};
