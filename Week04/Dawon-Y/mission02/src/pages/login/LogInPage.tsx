import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils/validation';
import { loginAPI } from '../../api/auth';
import { useState } from 'react';
import type { LoginFormValues } from '../../types/auth';

const LogInPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (formValues: LoginFormValues) => {
    try {
      setIsLoading(true);
      setApiError('');
      
      const data = await loginAPI(formValues.email, formValues.password);
      
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      const err = error as { message: string };
      setApiError(err.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm<LoginFormValues>(
    { email: '', password: '' },
    validateLogin
  );

  const isFormValid = Object.keys(errors).length === 0 && values.email && values.password;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 뒤로 가기 버튼 - 왼쪽 상단 */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="text-white text-3xl hover:text-gray-300 flex items-center"
          >
            <span className="transform scale-150">‹</span>
          </button>
        </div>

        {/* 로그인 타이틀 */}
        <h1 className="text-white text-3xl font-bold text-center mb-12">로그인</h1>

        <form onSubmit={handleSubmit(login)} className="space-y-4">
          {/* 구글 로그인 버튼 */}
          <button
            type="button"
            className="w-full bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            구글 로그인
          </button>

          {/* OR 구분선 */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* 이메일 입력 */}
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
              } text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500`}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
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
              } text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500`}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* API 에러 메시지 */}
          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isFormValid && !isLoading
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed'
            }`}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;