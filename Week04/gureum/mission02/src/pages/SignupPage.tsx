import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const SignupPage = () => {
  const navigate = useNavigate();
  
  const { getFieldProps, isFormValid } = useForm(
    {
      email: '',
      password: '',
      confirmPassword: ''
    },
    {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '올바른 이메일을 입력해주세요.'
      },
      password: {
        required: true,
        minLength: 6,
        message: '비밀번호는 최소 6자 이상이어야 합니다.'
      },
      confirmPassword: {
        required: true,
        minLength: 6,
        message: '비밀번호 확인을 입력해주세요.'
      }
    }
  );

  const emailProps = getFieldProps('email');
  const passwordProps = getFieldProps('password');
  const confirmPasswordProps = getFieldProps('confirmPassword');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && passwordProps.value === confirmPasswordProps.value) {
      console.log('회원가입 시도');
      navigate('/login');
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google 회원가입');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-pink-500 text-xl font-bold">돌려돌려 LP판</h1>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate('/login')}
            className="text-white px-3 py-1 border border-gray-600 rounded text-sm hover:bg-gray-800"
          >
            로그인
          </button>
          <button className="bg-pink-500 text-white px-3 py-1 rounded text-sm hover:bg-pink-600">
            회원가입
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8 space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-white hover:text-gray-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-white text-2xl font-semibold">회원가입</h2>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Google Signup Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              구글 로그인
            </button>

            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="이메일을 입력해주세요!"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                {...emailProps}
              />
              {emailProps.error && (
                <p className="mt-1 text-sm text-red-500">{emailProps.error}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                {...passwordProps}
              />
              {passwordProps.error && (
                <p className="mt-1 text-sm text-red-500">{passwordProps.error}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요!"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                {...confirmPasswordProps}
              />
              {confirmPasswordProps.error && (
                <p className="mt-1 text-sm text-red-500">{confirmPasswordProps.error}</p>
              )}
              {passwordProps.value !== confirmPasswordProps.value && confirmPasswordProps.value && (
                <p className="mt-1 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={!isFormValid || passwordProps.value !== confirmPasswordProps.value}
              className={`w-full py-3 rounded-md font-medium transition-colors ${
                isFormValid && passwordProps.value === confirmPasswordProps.value
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;