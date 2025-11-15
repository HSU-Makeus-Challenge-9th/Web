import * as S from "./styles/FormBarStyle";

const FormBar = () => {
  return (
    <div className={S.FormBarContainer}>
      <div className={S.FormBarDiv} />
      <p className={S.FormBarP}>OR</p>
      <div className={S.FormBarDiv} />
    </div>
  );
};

export default FormBar;
