import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EmailFormData, PasswordFormData, NicknameFormData } from '../../schemas/authSchema';
import { signupAPI } from '../../api/auth';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import NicknameStep from './Nicknamestep';

type SignupData = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
};

const MultiStepSignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState<Partial<SignupData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const onEmailSubmit = (data: EmailFormData) => {
    setSignupData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    setSignupData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const onNicknameSubmit = async (data: NicknameFormData) => {
    const finalData = { ...signupData, ...data } as SignupData;
    
    try {
      setIsLoading(true);
      await signupAPI(
        finalData.email, 
        finalData.password, 
        finalData.passwordCheck,
        finalData.nickname
      );
      alert('회원가입 성공!');
      navigate('/');
    } catch (error) {
      const err = error as { message: string };
      alert(err.message || '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 뒤로 가기 */}
        <div className="mb-12">
          <button
            onClick={handleBack}
            className="text-white text-3xl hover:text-gray-300"
          >
            <span className="transform scale-150">‹</span>
          </button>
        </div>

        <h1 className="text-white text-3xl font-bold text-center mb-12">회원가입</h1>

        {/* Step 렌더링 */}
        {step === 1 && <EmailStep onNext={onEmailSubmit} />}
        
        {step === 2 && (
          <PasswordStep 
            email={signupData.email || ''} 
            onNext={onPasswordSubmit} 
          />
        )}
        
        {step === 3 && (
          <NicknameStep 
            onSubmit={onNicknameSubmit} 
            isLoading={isLoading} 
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepSignUpPage;