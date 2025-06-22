import express from 'express';
import {
  getAllChallenges,
  getChallengeById,
} from '../controllers/challenges.controller';

const router = express.Router();

router.get('/', getAllChallenges);
router.get('/:id', getChallengeById);

export default router;
