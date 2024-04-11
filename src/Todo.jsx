import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

export default function Todo() {
  const [todo, setTodo] = useState({
    title: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [newTodoList, setNewTodoList] = useState([]);
  const [isInput, setIsInput] = useState(false);

  const handleTodoSubmit = e => {
    setTodo({
      title: e,
    });
    console.log('todo', todo);
  };

  // useEffect(() => {
  //   const getTodos = async () => {
  //     try {
  //       const res = await fetch('/dashboards');
  //       const data = await res.json();
  //       setTodoList(data);
  //     } catch (error) {
  //       console.error('api 호출 에러:', error);
  //     }
  //   };
  //   getTodos();
  // }, [setTodoList]);

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
    return data;
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

      setNewTodoList(todoList.filter(e => e.id !== data.id));
      setTodoList(newTodoList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = async (id, newTodo) => {
    try {
      const res = await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      console.log('수정시 res', res);

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        const newTo = todoList.map(e =>
          e.id === data.id ? { ...e, title: data.title } : e,
        );
        setNewTodoList(
          todoList.map(e =>
            e.id === data.id ? { ...e, title: data.title } : e,
          ),
        );
        console.log('새로운투두리스트', newTodoList);

        console.log(newTo);
        setTodoList(newTo);
      }
    } catch {
      console.log('투두 수정 실패');
    }
  };

  const onGetTodo = async id => {
    try {
      const res = await fetch(`/dashboards/${id}/todos`);
      const data = await res.json();
      setTodoList(data);
    } catch (error) {
      console.error('대시보드 api 호출 에러:', error);
    }
    setIsInput(true);
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

  return (
    <div>
      <div>
        <button onClick={() => onGetTodo(1)}>dashboard_1</button>
        <button onClick={() => onGetTodo(2)}>dashboard_2</button>
        <button onClick={() => onGetTodo(3)}>dashboard_3</button>
      </div>
      {isInput ? (
        <form>
          <input
            type="text"
            value={todo.title}
            onChange={e => handleTodoSubmit(e.target.value)}
          />
          <button onClick={onSubmitTodo}>추가</button>
        </form>
      ) : null}
      <div>
        {todoList.map(e => (
          <TodoItem
            id={e.id}
            title={e.title}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
          />
        ))}
      </div>
      {/* <div>
        {todoList.map(e => (
          <div key={e.id}>
            {!isEdit ? (
              <div>
                {e.id}: {e.title}
                <button onClick={() => handleDeleteTodo(e.id)}>삭제</button>
                <button onClick={handleIsEdit}>수정</button>
              </div>
            ) : (
              <div>
                {e.id}
                <input value={newTodo.title} />
                <button onClick={handleIsEdit}>취소</button>
                <button onClick={handleEditTodo}>확인</button>
              </div>
            )}
          </div>
        ))}
      </div> */}
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
