import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postSignin } from '../apis/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../constants/key';

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEYS.accessToken);
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string): string => {
    if (!email.trim()) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return '올바른 이메일 형식을 입력해주세요.';
    return '';
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string): string => {
    if (!password.trim()) return '';
    if (password.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    return '';
  };

  const handleInputChange = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    
    // 실시간 유효성 검사
    let error = '';
    if (field === 'email') {
      error = validateEmail(value);
    } else if (field === 'password') {
      error = validatePassword(value);
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleGoogleLogin = () => {
    // Google 로그인 로직 (추후 구현)
    alert('Google 로그인은 추후 구현 예정입니다.');
  };

  const handleLogin = async () => {
    const emailError = validateEmail(loginData.email);
    const passwordError = validatePassword(loginData.password);

    if (emailError || passwordError || !loginData.email.trim() || !loginData.password.trim()) {
      setErrors({
        email: emailError || (!loginData.email.trim() ? '이메일을 입력해주세요.' : ''),
        password: passwordError || (!loginData.password.trim() ? '비밀번호를 입력해주세요.' : '')
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await postSignin(loginData);
      setItem(response.data.accessToken);
      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return loginData.email.trim() && 
           loginData.password.trim() && 
           !errors.email && 
           !errors.password;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-pink-500 text-xl font-bold">돌려돌려 LP판</h1>
        <div className="flex space-x-3">
          <button className="text-white px-4 py-2 border border-gray-600 rounded text-sm bg-gray-800">
            로그인
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-pink-500 text-white px-4 py-2 rounded text-sm hover:bg-pink-600 transition-colors"
          >
            회원가입
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* 뒤로가기 버튼과 제목 */}
          <div className="flex items-center justify-center mb-8 relative">
            <button 
              onClick={() => navigate('/')}
              className="absolute left-0 text-white hover:text-gray-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-white text-2xl font-semibold">로그인</h2>
          </div>

          {/* Google 로그인 버튼 */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black py-3 px-4 rounded-md mb-4 flex items-center justify-center space-x-2 font-medium hover:bg-gray-100 transition-colors"
          >
            <span className="text-lg font-bold text-blue-500">G</span>
            <span>구글 로그인</span>
          </button>
          
          {/* OR 구분선 */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>
          
          {/* 이메일 입력 */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              className={`w-full px-4 py-3 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              }`}
              value={loginData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => {
                if (loginData.email.trim()) {
                  const error = validateEmail(loginData.email);
                  setErrors(prev => ({ ...prev, email: error }));
                }
              }}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요!"
                className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                }`}
                value={loginData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => {
                  if (loginData.password.trim()) {
                    const error = validatePassword(loginData.password);
                    setErrors(prev => ({ ...prev, password: error }));
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            onClick={handleLogin}
            disabled={!isFormValid() || isLoading}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              isFormValid() && !isLoading
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? '처리중...' : '로그인'}
          </button>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              아직 계정이 없으신가요?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-pink-500 hover:text-pink-400 underline"
              >
                회원가입하기
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
