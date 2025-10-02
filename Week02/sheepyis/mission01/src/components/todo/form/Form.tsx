import * as S from "./FormStyle";
import FormAdd from "./formAdd/FormAdd";
import FormSectionList from "./list/formSectionList/FormSectionList";

const Form = () => {
  return (
    <S.FormContainer>
      <FormAdd />
      <FormSectionList />
    </S.FormContainer>
  );
};

export default Form;
