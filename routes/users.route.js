import express from 'express';
import {
 searchForUsers,
  getConversationUsers,
} from '../controllers/users.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();
router.post('/search', protectRoute, searchForUsers);
router.get('/conversation', protectRoute, getConversationUsers);

export default router;
