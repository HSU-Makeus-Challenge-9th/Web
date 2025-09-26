import type { TodoItem } from "../../../../../types/todo/todo";
import * as S from "./FormSectionListItemStyle";
import FormTodoList from "../../list/formTodoList/FormTodoList";

interface Props {
  title: string;
  items: TodoItem[];
}

const FormSectionListItem = ({ title, items }: Props) => {
  return (
    <S.FormSectionListItemContainer>
      <S.FormSectionListItemP>{title}</S.FormSectionListItemP>

      <FormTodoList items={items} />
    </S.FormSectionListItemContainer>
  );
};

export default FormSectionListItem;
