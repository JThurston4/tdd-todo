import { Checkbox } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import {todoStatusChanged} from '../../store/todos';

function TodosDisplay (props) {
  const dispatch = useDispatch();
  const {todos} = props;

  const handleCheckboxChange = (todo) => {
    dispatch(todoStatusChanged({id: todo.id, completed: !todo.completed}))
  }

  return todos && !!todos.length ? (
    <ul data-testid="todo-list">{todos.map((todo, index) => 
        <li data-testid="todo-item" key={index}>
          <p>{todo.description}</p>
          <Checkbox
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo)}
          />
        </li>
      )}
    </ul>
  ) : (
    <p data-testid="todo-list">No Todos...</p>
  )
}

export default TodosDisplay;