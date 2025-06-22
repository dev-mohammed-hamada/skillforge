import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getAllChallenges = async (req: Request, res: Response) => {
  const challenges = await prisma.challenge.findMany({
    select: {
      id: true,
      title: true,
      difficulty: true,
      topic: true,
      createdAt: true,
    },
  });
  res.json({ message: 'Success', challenges });
};

export const getChallengeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      topic: true,
      createdAt: true,
    },
  });

  if (!challenge) throw { status: 404, message: 'Challenge not found' };

  res.json({ message: 'Success', challenge });
};
