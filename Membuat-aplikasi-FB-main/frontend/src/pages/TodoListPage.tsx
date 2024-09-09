import React, { useState } from 'react';

interface Todo {
  title: string;
  description: string;
}

const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({ title: '', description: '' });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTodo = () => {
    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = newTodo;
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo({ title: '', description: '' });
  };

  const handleEditTodo = (index: number) => {
    setEditingIndex(index);
    setNewTodo(todos[index]);
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Todo List</h2>
      
      {/* Form */}
      <div>
        <input
          type="text"
          name="title"
          value={newTodo.title}
          placeholder="Title"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          value={newTodo.description}
          placeholder="Description"
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>
          {editingIndex !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoListPage;
