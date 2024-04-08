import { useState } from 'react';

export default function TodoItem({ id, title }) {
  const [isEdit, setIsEdit] = useState(true);
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <div>
          {id}: {title}
          <button>삭제</button>
          <button onClick={handleIsEdit}>수정</button>
        </div>
      ) : (
        <div>
          {id}: {title}
          <button onClick={handleIsEdit}>취소</button>
          <button>확인</button>
        </div>
      )}
    </div>
  );
}
