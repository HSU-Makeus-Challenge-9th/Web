import * as S from "./FormSectionListStyle";
import { useTodos } from "../../../../../hooks/todo/useTodos";
import FormSectionListItem from "../../item/formSectionListItem/FormSectionListItem";

const FormSectionList = () => {
  const { todos, doneTodos } = useTodos();

  return (
    <S.FormSectionListContainer>
      <FormSectionListItem title="할 일" items={todos} />
      <FormSectionListItem title="완료" items={doneTodos} />
    </S.FormSectionListContainer>
  );
};

export default FormSectionList;
