import express from 'express';
import {
  loginController,
  singUpController,
  logOutController,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/signup', singUpController);
router.post('/logout', logOutController);

export default router;
