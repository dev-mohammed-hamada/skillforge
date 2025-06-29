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
    throw {
      status: 400,
      message: 'Invalid input',
      errors: parsed.error.flatten(),
    };

  const goal = await prisma.learningGoal.create({
    data: {
      ...parsed.data,
      userId: req.userId!,
    },
  });

  res.status(201).json({ message: 'Goal created successfully', goal });
};

export const getAllGoals = async (req: AuthRequest, res: Response) => {
  const goals = await prisma.learningGoal.findMany({
    where: {
      userId: req.userId,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ message: 'Success', goals });
};

export const getGoalById = async (req: AuthRequest, res: Response) => {
  const goal = await prisma.learningGoal.findFirst({
    where: { userId: req.userId, id: req.params.id },
  });

  if (!goal) throw { status: 404, message: 'Goal not found' };

  res.json({ message: 'Success', goal });
};

export const updateGoal = async (req: AuthRequest, res: Response) => {
  const parsed = updateGoalSchema.safeParse({
    ...req.body,
    progress: parseInt(req.body.progress) || undefined,
  });
  if (!parsed.success)
    throw {
      status: 400,
      message: 'Invalid input',
      errors: parsed.error.flatten(),
    };

  const goal = await prisma.learningGoal.findFirst({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!goal) throw { status: 404, message: 'Goal not found' };

  const updated = await prisma.learningGoal.update({
    where: { id: goal.id },
    data: parsed.data,
  });

  res.json({ message: 'Goal updated successfully', updated });
};

export const deleteGoal = async (req: AuthRequest, res: Response) => {
  const goal = await prisma.learningGoal.findFirst({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!goal) throw { status: 404, message: 'Goal not found' };

  await prisma.learningGoal.delete({ where: { id: goal.id } });

  res.json({ message: 'Goal deleted successfully' });
};
