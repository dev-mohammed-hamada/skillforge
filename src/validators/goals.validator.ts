import { optional, z } from 'zod';

export const createGoalSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
});

export const updateGoalSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  progress: z.number().min(0).max(100).optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
});
