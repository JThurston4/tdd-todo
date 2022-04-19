import { Checkbox } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {todoStatusChanged, todoDeleted} from '../../store/todos';

function TodosDisplay (props) {
  
  const dispatch = useDispatch();
  const {todos} = props;
  // console.log(todos)

  const handleCheckboxChange = (todo) => {
    dispatch(todoStatusChanged({id: todo.id, completed: !todo.completed}));
  }

  const handleDelete = (id) => {
    dispatch(todoDeleted(id));
  }

  return todos && !!todos.length ? (
    <ul data-testid="todo-list">{todos.map((todo, index) => 
        <li data-testid="todo-item" key={index}>
          <p>{todo.description}</p>
          <Checkbox
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo)}
          />
          <button data-testid="delete-todo" onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      )}
    </ul>
  ) : (
    <p data-testid="todo-list">No Todos...</p>
  )
}

export default TodosDisplay;