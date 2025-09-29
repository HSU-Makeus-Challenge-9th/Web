import { useTodo } from "../hooks/useTodo";
import CompleteItem from "./CompleteItem";

const CompleteList: React.FC = () => {
  const { completetodos } = useTodo();
  return (
    <ul id="completeList">
      {completetodos.map((completetodo, index) => (
        <CompleteItem completeTodo={completetodo} index={index} />
      ))}
    </ul>
  );
};

export default CompleteList;
