import React, { useState } from 'react';

function Todo () {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState('');

  const handleAdd = () => {
    
    setTodos(todos => [...todos, <li data-testid="todo-item">{addTodo}</li>]);
  }

  const handleTextChange = (ev) => {
    // console.log(ev.target.value);
    setAddTodo(ev.target.value);
 }
  return (
    <div>
      <textarea data-testid="todo-text-input" value={addTodo} onChange={handleTextChange}></textarea>
      <button data-testid="todo-add-btn" onClick={handleAdd}>Add</button>
      <ul data-testid="todo-list">{todos}</ul>
    </div>
  )
}


export default Todo;