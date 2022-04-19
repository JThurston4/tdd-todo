import {createSlice} from '@reduxjs/toolkit'

const initialState = {todos: []};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: (state, action) => {
      state.todos.push(action.payload);
    },

    todoDeleted: (state, action) => {
      state.todos = [...state.todos].filter((todo) => todo.id !== action.payload);
    },
    todoStatusChanged: (state, action) => {
      state.todos = state.todos.map((todo, i) => {
        if(todo.id !== action.payload.id) {
          return todo;
        };
        return {...todo, completed: action.payload.completed};
      });
    }
  }
})

export default todosSlice.reducer;

export const {todoAdded, todoDeleted, todoStatusChanged} = todosSlice.actions;
