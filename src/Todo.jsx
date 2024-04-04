import { useEffect, useState } from 'react';

export default function Todo() {
  const [todo, setTodo] = useState({
    title: '',
  });
  const [todoList, setTodoList] = useState([]);

  const handleTodoSubmit = e => {
    setTodo({
      title: e,
    });
    console.log('todo', todo);
  };

  const onSubmitTodo = async e => {
    e.preventDefault();
    const result = await handleAddTodo();
    setTodoList([...todoList, result]);
    setTodo({
      title: '',
    });

    console.log('result 값:', result);
  };

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
  }, [setTodoList]);

  const handleAddTodo = async () => {
    try {
      const res = await fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      const data = await res.json();
      console.log('투두 추가시 응답 :', res);
      return data;
    } catch {
      console.log('투두 추가 실패');
    }
  };

  const handleDeleteTodo = async id => {
    try {
      const res = await fetch(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      const data = await res.json();
      console.log('res값:', data);
    } catch (error) {
      console.error(error);
    }
  };

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
          <div key={e.id}>
            {`${e.id}: ${e.title}`}
            <button onClick={() => handleDeleteTodo(e.id)}>삭제</button>
          </div>
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
      <input type="text" value={todo} 
      onChange={handleTodoSubmit} />
      <button>추가</button>
    </div>
  );
}

*/
