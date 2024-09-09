import express from 'express';
import Todo from '../models/todoModel'; // Jalur relatif dari folder `routes`

const router = express.Router();

// Create a new Todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

export default router;
