import express from 'express';
import { join, login, checkedEmail, checkedNickName } from './user.controller';

const router = express.Router();

router.post('/check-email', checkedEmail);
router.post('/check-nickname', checkedNickName);
router.post('/join', join);
router.post('/login', login);

export default router;
