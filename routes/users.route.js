import express from 'express';
import {
  getConversationUsers,
} from '../controllers/users.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/conversation', protectRoute, getConversationUsers);

export default router;
