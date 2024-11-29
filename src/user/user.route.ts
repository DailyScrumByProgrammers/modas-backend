import express from 'express';
import { join } from './user.controller';

const router = express.Router();

router.post('/join', join);

export default router;
