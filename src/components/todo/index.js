// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TodosInput from './todosInput';
import TodosDisplay from './todosDisplay';
import { useDispatch, useSelector } from 'react-redux';

function Todo () {
  const todos = useSelector(state => state.entities.todos.todos);

  // for api mocking
  // useEffect(() => {
  //   const fetchAllTodos = async () => {
  //     try {
  //       const response = await axios.get('/api/todos');
  //       setTodos(response.data.todos);
  //     } catch (err) {
  //       setErrorMessage('Failed to fetch todos');
  //     }
  //   };

  //   fetchAllTodos();
  // }, []);

  return (
    <div>
      <TodosInput todoLength={todos.length}/>
      <TodosDisplay todos={todos}/>
    </div>
  )
}

export default Todo;