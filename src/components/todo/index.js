import axios from 'axios';
import { Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Todo () {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data.todos);
      } catch (err) {
        setErrorMessage('Failed to fetch todos');
      }
    };

    fetchAllTodos();
  }, []);

  const handleAdd = () => {
    setTodos(todos => [...todos, {description: addTodo, completed: false}]);
  }

  const handleTextChange = (ev) => {
    setAddTodo(ev.target.value);
  }

  const handleCheckboxChange = (index) => {
    todos[index].completed = !todos[index].completed;
    setTodos([...todos])
  }

  return (
    <div>
      <textarea data-testid="todo-text-input" value={addTodo} onChange={handleTextChange}></textarea>
      <button data-testid="todo-add-btn" onClick={handleAdd}>Add</button>
      {errorMessage && (
        <p>{errorMessage}</p>
      )}
      <ul data-testid="todo-list">{todos.map((todo, index) => 
          <li data-testid="todo-item" key={index}>
            <p>{todo.description}</p>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleCheckboxChange(index)}
            />
          </li>
        )}
      </ul>
    </div>
  )
}


export default Todo;