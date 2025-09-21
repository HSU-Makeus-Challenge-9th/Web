import * as S from "./FormAddStyle";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import { useState } from "react";
import { useTodos } from "../../../../hooks/todo/useTodos";

const FormAdd = () => {
  const { add } = useTodos();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add(value);
    setValue("");
  };

  return (
    <S.FormAddContainer as="form" onSubmit={onSubmit}>
      <Input
        placeholder="할 일 입력"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button text="할 일 추가" type="submit" />
    </S.FormAddContainer>
  );
};

export default FormAdd;
