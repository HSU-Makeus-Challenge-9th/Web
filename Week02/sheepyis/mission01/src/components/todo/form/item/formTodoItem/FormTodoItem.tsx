import * as S from "./FormTodoItemStyle";
import Button from "../../../common/button/Button";
import type { TodoItem } from "../../../../../types/todo/todo";
import { useTodos } from "../../../../../hooks/todo/useTodos";

type Props = { item: TodoItem };

const FormTodoItem = ({ item }: Props) => {
  const { complete, remove } = useTodos();

  const onClick = () => {
    if (item.type === "todo") complete(item.id);
    else remove(item.id);
  };

  return (
    <S.FormTodoItemContainer>
      <S.FormTodoP>{item.text}</S.FormTodoP>
      <Button
        height={4}
        text={item.type === "todo" ? "완료" : "삭제"}
        backgroundColor={item.type === "todo" ? "default" : "red"}
        onClick={onClick}
      />
    </S.FormTodoItemContainer>
  );
};

export default FormTodoItem;
