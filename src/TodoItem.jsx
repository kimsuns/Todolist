import { useState } from 'react';

export default function TodoItem({
  id,
  title,
  handleDeleteTodo,
  handleEditTodo,
}) {
  const [isEdit, setIsEdit] = useState(true);
  const [newTodo, setNewTodo] = useState({
    title: title,
  });

  const onChangeNewTodo = e => {
    setNewTodo({
      title: e,
    });
  };

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCancleTodo = () => {
    setNewTodo({ title });
    handleIsEdit();
  };

  const onSubmitNewTodo = () => {
    handleEditTodo(id, newTodo);
    handleIsEdit();
  };

  return (
    <div>
      {isEdit ? (
        <div>
          {id}: {title}
          <button onClick={() => handleDeleteTodo(id)}>삭제</button>
          <button onClick={handleIsEdit}>수정</button>
        </div>
      ) : (
        <div>
          {id}:
          <input
            value={newTodo.title}
            onChange={e => onChangeNewTodo(e.target.value)}
          />
          <button onClick={handleCancleTodo}>취소</button>
          <button onClick={onSubmitNewTodo}>확인</button>
        </div>
      )}
    </div>
  );
}
