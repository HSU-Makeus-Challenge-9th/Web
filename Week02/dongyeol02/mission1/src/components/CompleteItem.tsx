import React from "react";
import { useTodo } from "../hooks/useTodo";

interface CompleteItemProps {
  completeTodo: string;
  index: number;
}

const CompleteItem: React.FC<CompleteItemProps> = ({ completeTodo, index }) => {
  const { handleDelete } = useTodo();

  return (
    <li>
      {" "}
      {/* key 제거 */}
      {completeTodo} <button onClick={() => handleDelete(index)}>삭제</button>
    </li>
  );
};

export default CompleteItem;
