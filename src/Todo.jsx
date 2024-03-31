import { useState } from 'react';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleTodoSubmit = e => {
    setTodo(e);
    console.log('todo', todo);
  };

  const onSubmitTodo = e => {
    e.preventDefault();
    setTodoList([...todoList, todo]);
    setTodo('');
    console.log('todoList:', todoList);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={todo}
          onChange={e => handleTodoSubmit(e.target.value)}
        />
        <button onClick={onSubmitTodo}>추가</button>
      </form>
      <div>
        {todoList.map(e => (
          <div>{e}</div>
        ))}
      </div>
    </div>
  );
}

/*
왜 에러날까요...?
[eslint] 
src\Todo.jsx
  Line 45:11:  Use object destructuring  prefer-destructuring

export default function Todo() {
  const [todo, setTodo] = useState('');

  const handleTodoSubmit = e => {
    const value = e.target.value;
    setTodo(value);
  };

  return (
    <div>
      <input type="text" value={todo} onChange={handleTodoSubmit} />
      <button>추가</button>
    </div>
  );
}

*/
