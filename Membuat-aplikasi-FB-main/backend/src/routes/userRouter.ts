import express from 'express';
import { createUser, getUser } from '../controllers/userControllers';

const router = express.Router();

// Route for creating a new user
router.post('/users', createUser);

// Route for getting a user by ID
router.get('/users/:id', getUser);

// More routes for update and delete

export default router;
