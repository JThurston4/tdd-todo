import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Counter from './components/Counter/index';
import Todo from './components/todo';

function App() {
  return (
    <div className="App">
      <Counter />
      <Todo />
    </div>
  );
}

export default App;
