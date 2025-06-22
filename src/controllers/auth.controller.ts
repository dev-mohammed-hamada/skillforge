import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma';
import { generateToken } from '../utils/jwt';
import { registerSchema, loginSchema } from '../validators/auth.validator';

export const registerUser = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: 'Invalid input', errors: parsed.error.flatten() });
  }

  const { username, email, password } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email, username }] },
  });
  if (existing)
    return res.status(400).json({ message: 'Email or username already taken' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    message: 'User create',
    user: { id: user.id, username: user.username },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: 'Invalid input', errors: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user.id);

  res.json({
    token: `Bearer ${token}`,
    user: { id: user.id, username: user.username },
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  res.json({
    message: 'Signed out. Please delete the token from client storage.',
  });
};
