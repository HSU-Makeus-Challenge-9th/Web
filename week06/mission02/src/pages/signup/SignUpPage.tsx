import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { validateSignup } from '../../utils/validation';
import { signupAPI } from '../../api/auth';
import { useState } from 'react';
import type { SignupFormValues } from '../../types/auth';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signup = async (formValues: SignupFormValues) => {
    try {
      setIsLoading(true);
      setApiError('');
      
      await signupAPI(formValues.email, formValues.password, formValues.passwordCheck);
      
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      const err = error as { message: string };
      setApiError(err.message || '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm<SignupFormValues>(
    { email: '', password: '', passwordCheck: '' },
    validateSignup
  );

  const isFormValid =
    Object.keys(errors).length === 0 &&
    values.email &&
    values.password &&
    values.passwordCheck;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-2xl mb-8 hover:text-gray-300"
        >
          ←
        </button>

        <h1 className="text-white text-3xl font-bold text-center mb-8">회원가입</h1>

        <form onSubmit={handleSubmit(signup)} className="space-y-4">
          {/* 이메일 */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요!"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-transparent border ${
                touched.email && errors.email ? 'border-red-500' : 'border-gray-600'
              } text-white p-3 rounded-lg focus:outline-none focus:border-pink-500`}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요!"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-transparent border ${
                touched.password && errors.password ? 'border-red-500' : 'border-gray-600'
              } text-white p-3 rounded-lg focus:outline-none focus:border-pink-500`}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호를 다시 입력해주세요!"
              value={values.passwordCheck}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-transparent border ${
                touched.passwordCheck && errors.passwordCheck
                  ? 'border-red-500'
                  : 'border-gray-600'
              } text-white p-3 rounded-lg focus:outline-none focus:border-pink-500`}
            />
            {touched.passwordCheck && errors.passwordCheck && (
              <p className="text-red-500 text-sm mt-1">{errors.passwordCheck}</p>
            )}
          </div>

          {/* API 에러 */}
          {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isFormValid && !isLoading
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? '회원가입 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;