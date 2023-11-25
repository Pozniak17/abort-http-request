import axios from 'axios';
import { useEffect, useState } from 'react';

export const HttpReqAbort = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(prevState => !prevState)}>
        {isVisible ? 'Unmount' : 'Mount'}
      </button>
      {isVisible && <ChildComponent />}
    </div>
  );
};

const ChildComponent = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(false);
        const url = 'https://jsonplaceholder.typicode.com/todos1';
        const response = await axios.get(url, {});
        setTodos(response.data);
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>ChildComponent</h2>
      {error && (
        <p style={{ color: 'red' }}>
          Sorry! There was an error! Please try refreshing the page!
        </p>
      )}
      {todos.length > 0 && (
        <div>
          {todos.map(todo => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};
