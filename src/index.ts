import express from 'express';
import dotenv from 'dotenv';
import protectedRoutes from './routes/protected.routes';
import authRoutes from './routes/auth.routes';
import goalsRoutes from './routes/goals.routes';
import challengeRoutes from './routes/challenges.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'SkillForge API is running!' });
});

app.use('/protected', protectedRoutes);

app.use('/auth', authRoutes);
app.use('/goal', goalsRoutes);
app.use('/challenge', challengeRoutes);

app.use((req, res, next) => {
  const error = new Error('Route not found');
  (error as any).status = 404;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
