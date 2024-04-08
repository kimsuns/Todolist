import { useEffect, useState } from 'react';

export default function Todo() {
  const [todo, setTodo] = useState({
    title: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleTodoSubmit = e => {
    setTodo({
      title: e,
    });
    console.log('todo', todo);
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

      const newTodoList = todoList.filter(e => e.id !== data.id);
      setTodoList(newTodoList);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleEditTodo = () => {
  //   setIsEdit(true);
  // };

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
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
            {!isEdit ? (
              <div>
                {e.id}: {e.title}
                <button onClick={() => handleDeleteTodo(e.id)}>삭제</button>
                <button onClick={handleIsEdit}>수정</button>
              </div>
            ) : (
              <div>
                <button onClick={handleIsEdit}>취소</button>
                <button>확인</button>
              </div>
            )}
            {/* 수정을 누르면 삭제,수정 버튼 대신 취소, 확인 버튼. todp가 input에 담겨 수정할 수 있어야 함 */}
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
