import { FormProvider } from "react-hook-form";
import * as S from "./styles/SignupFormStyle";
import FormHeader from "../../Common/Header/FormHeader/FormHeader";
import GoogleButton from "../../Common/Button/GoogleButton/GoogleButton";
import FormBar from "../../Common/FormBar/FormBar";
import SignupInnerForm1 from "../SignupInnerForm/SignupInnerForm1/SignupInnerForm1";
import SignupInnerForm2 from "../SignupInnerForm/SignupInnerForm2/SignupInnerForm2";
import SignupInnerForm3 from "../SignupInnerForm/SignupInnerForm3/SignupInnerForm3";
import { useSignupForm } from "../../../hooks/auth/useSignupForm";
import { useNavigation } from "../../../hooks/useNavigation";

const SignupForm = () => {
  const { step, next, prev, methods } = useSignupForm();
  const { handleBackClick } = useNavigation();

  const handleHeaderBack = () => {
    if (step === 1) handleBackClick();
    else prev();
  };

  return (
    <div className={S.SignupFormContainer}>
      <FormHeader title="회원가입" onBack={handleHeaderBack} />
      <GoogleButton />
      <FormBar />

      <FormProvider {...methods}>
        {step === 1 && <SignupInnerForm1 onNext={next} />}
        {step === 2 && <SignupInnerForm2 onPrev={prev} onNext={next} />}
        {step === 3 && <SignupInnerForm3 />}
      </FormProvider>
    </div>
  );
};

export default SignupForm;
