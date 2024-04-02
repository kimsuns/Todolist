import { useEffect, useState } from 'react';

export default function Todo() {
  const [todo, setTodo] = useState({
    id: '',
    title: '',
  });
  const [todoList, setTodoList] = useState([]);

  const handleTodoSubmit = e => {
    setTodo({
      id: 1,
      title: e,
    });
    console.log('todo', todo);
  };

  const onSubmitTodo = e => {
    e.preventDefault();
    setTodoList([...todoList, todo]);
    setTodo({
      title: '',
    });
    console.log('todoList:', todoList);
  };

  // async function getTodos(){
  //   try {
  //     const res = await fetch('/todos')
  //     .then const result = await res.json()
  //     .then
  //   }
  // }

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch('/todos');
        const data = await res.json();
        setTodoList(data);
      } catch (error) {
        console.error('api 호출 에러:', error);
      }
    };

    getTodos();
  }, []);

  return (
    <div>
      <form>
        <input
          type="text"
          value={todo.title}
          onChange={e => handleTodoSubmit(e.target.value)}
        />
        <button onClick={onSubmitTodo}>추가</button>
      </form>
      <div>
        {todoList.map(e => (
          <div key={e.id}>{`${e.id}: ${e.title}`}</div>
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
