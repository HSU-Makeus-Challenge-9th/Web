import * as S from "./FormTodoListStyle";
import FormTodoItem from "../../item/formTodoItem/FormTodoItem";
import type { TodoItem } from "../../../../../types/todo/todo";

type Props = { items: TodoItem[] };

const FormTodoList = ({ items }: Props) => {
  return (
    <S.FormTodoListContainer>
      {items.map((item) => (
        <FormTodoItem key={item.id} item={item} />
      ))}
    </S.FormTodoListContainer>
  );
};

export default FormTodoList;
