import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginSchema, type LoginFormData } from '../../schemas/authSchema';
import { useAuth } from '../../hooks/useAuth';
import { loginAPI } from '../../api/auth';

const LogInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateTokens } = useAuth();

  const from = location.state?.from || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => loginAPI(data.email, data.password),
    onSuccess: (response) => {
      // 토큰 저장
      updateTokens(response.accessToken, response.refreshToken);
      // 홈으로 리다이렉트
      navigate(from, { replace: true });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleGoogleLogin = () => {
    const from = location.state?.from || '/';
    localStorage.setItem('redirectAfterLogin', from);
    
    // 구글 로그인 페이지로 리디렉트
    window.location.href = 'http://localhost:8000/v1/auth/google/login';
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="text-white text-3xl hover:text-gray-300 flex items-center"
          >
            <span className="transform scale-150">‹</span>
          </button>
        </div>

        <h1 className="text-white text-3xl font-bold text-center mb-12">로그인</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 font-medium"
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
              {...register('email')}
              className="w-full bg-transparent border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              {...register('password')}
              className="w-full bg-transparent border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {loginMutation.isError && loginMutation.error && (
            <p className="text-red-500 text-sm text-center">
              {(loginMutation.error as { message?: string })?.message || '로그인에 실패했습니다.'}
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid || loginMutation.isPending}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isValid && !loginMutation.isPending
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed'
            }`}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;