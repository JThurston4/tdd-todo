import { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  const handleAdd = () => {
    setCounter(1 + counter)
  }

  const handleSubtract = () => {
    setCounter(counter - 1)
  }

  return (
    <div className="Counter">
      <p data-testid="counter">{counter}</p>
      <button data-testid="add-btn" onClick={handleAdd}>Add</button>
      <button data-testid="subtract-btn" onClick={handleSubtract}>Subtract</button>
    </div>
  );
}

export default Counter;