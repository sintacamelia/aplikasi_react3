import { Schema, model } from 'mongoose';

// Definisi skema Todo
const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Membuat model Todo
const Todo = model('Todo', todoSchema);

// Ekspor model Todo
export default Todo;
