import express from 'express';
import { join, login } from './user.controller';

const router = express.Router();

router.post('/join', join);
router.post('/login', login);

export default router;
