import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, passwordSchema, nicknameSchema } from '../../schemas/authSchema';
import type { EmailFormData, PasswordFormData, NicknameFormData } from '../../schemas/authSchema';
import { signupAPI } from '../../api/auth';
import { Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: 이메일
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail, isValid: isValidEmail },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  });

  // Step 2: 비밀번호
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isValid: isValidPassword },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  // Step 3: 닉네임
  const {
    register: registerNickname,
    handleSubmit: handleSubmitNickname,
    formState: { errors: errorsNickname, isValid: isValidNickname },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
  });

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
      // ✅ nickname을 name 파라미터로 전달
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

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 뒤로 가기 */}
        <div className="mb-12">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
            className="text-white text-3xl hover:text-gray-300"
          >
            <span className="transform scale-150">‹</span>
          </button>
        </div>

        <h1 className="text-white text-3xl font-bold text-center mb-12">회원가입</h1>

        {/* Step 1: 이메일 */}
        {step === 1 && (
          <form onSubmit={handleSubmitEmail(onEmailSubmit)} className="space-y-4">
            {/* 구글 로그인 버튼 */}
            <button
              type="button"
              className="w-full bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 font-medium border border-gray-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              구글 로그인
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            <div>
              <input
                type="email"
                placeholder="이메일을 입력해주세요!"
                {...registerEmail('email')}
                className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-white placeholder-gray-500"
              />
              {errorsEmail.email && (
                <p className="text-red-500 text-sm mt-1">{errorsEmail.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValidEmail}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isValidEmail
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-gray-900 text-gray-600 cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </form>
        )}

        {/* Step 2: 비밀번호 */}
        {step === 2 && (
          <div className="space-y-6">
            {/* 이메일 표시 */}
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span>{signupData.email}</span>
            </div>

            <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
              {/* 비밀번호 */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력해주세요!"
                    {...registerPassword('password')}
                    className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-white placeholder-gray-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errorsPassword.password && (
                  <p className="text-red-500 text-sm mt-1">{errorsPassword.password.message}</p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <div className="relative">
                  <input
                    type={showPasswordCheck ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 입력해주세요!"
                    {...registerPassword('passwordCheck')}
                    className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-white placeholder-gray-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPasswordCheck ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errorsPassword.passwordCheck && (
                  <p className="text-red-500 text-sm mt-1">{errorsPassword.passwordCheck.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValidPassword}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isValidPassword
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                }`}
              >
                다음
              </button>
            </form>
          </div>
        )}

        {/* Step 3: 닉네임 */}
        {step === 3 && (
          <div className="space-y-6">
            {/* 프로필 이미지 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>

            <form onSubmit={handleSubmitNickname(onNicknameSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요!"
                  {...registerNickname('nickname')}
                  className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-white placeholder-gray-500"
                />
                {errorsNickname.nickname && (
                  <p className="text-red-500 text-sm mt-1">{errorsNickname.nickname.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValidNickname || isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isValidNickname && !isLoading
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isLoading ? '회원가입 중...' : '회원가입 완료'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepSignUpPage;