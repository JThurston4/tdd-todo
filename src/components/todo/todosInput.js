import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {todoAdded} from '../../store/todos';

function Todo (props) {
  const dispatch = useDispatch();
  const [addTodo, setAddTodo] = useState('');
  const {todoLength} = props;

  const handleAdd = () => {
    dispatch(
      todoAdded({
        description: addTodo, 
        completed: false,
        id: todoLength
      })
    );
    setAddTodo('');
  }

  const handleTextChange = (ev) => {
    setAddTodo(ev.target.value);
  }


  return (
    <div>
      <textarea data-testid="todo-text-input" value={addTodo} onChange={handleTextChange}></textarea>
      <button data-testid="todo-add-btn" onClick={handleAdd}>Add</button>
    </div>
  )
}


export default Todo;