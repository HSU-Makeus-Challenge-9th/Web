import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type SignupStep = 'email' | 'password' | 'profile';

const SignupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<SignupStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: ''
  });

  const handleGoogleSignup = () => {
    alert('Google 회원가입은 추후 구현 예정입니다.');
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return '이메일을 입력해주세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return '올바른 이메일 형식을 입력해주세요.';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) return '비밀번호를 입력해주세요.';
    if (password.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    return '';
  };

  const validateName = (name: string): string => {
    if (!name.trim()) return '닉네임을 입력해주세요.';
    if (name.length < 2) return '닉네임은 2자 이상이어야 합니다.';
    return '';
  };

  const handleNextStep = () => {
    if (currentStep === 'email') {
      const emailError = validateEmail(email);
      if (!emailError) {
        setErrors({ ...errors, email: '' });
        setCurrentStep('password');
      } else {
        setErrors({ ...errors, email: emailError });
      }
    } else if (currentStep === 'password') {
      const passwordError = validatePassword(password);
      const confirmError = password !== passwordConfirm ? '비밀번호가 일치하지 않습니다.' : '';
      
      if (!passwordError && !confirmError) {
        setErrors({ ...errors, password: '', passwordConfirm: '' });
        setCurrentStep('profile');
      } else {
        setErrors({ 
          ...errors, 
          password: passwordError, 
          passwordConfirm: confirmError 
        });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'password') {
      setCurrentStep('email');
    } else if (currentStep === 'profile') {
      setCurrentStep('password');
    }
  };

  const handleSignup = () => {
    const nameError = validateName(name);
    if (!nameError) {
      setErrors({ ...errors, name: '' });
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } else {
      setErrors({ ...errors, name: nameError });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-pink-500 text-xl font-bold">돌려돌려 LP판</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => navigate('/login')}
            className="text-white px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-800 transition-colors"
          >
            로그인
          </button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded text-sm hover:bg-pink-600 transition-colors">
            회원가입
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-8 relative">
            <button 
              onClick={() => {
                if (currentStep === 'email') {
                  navigate('/');
                } else {
                  handlePrevStep();
                }
              }}
              className="absolute left-0 text-white hover:text-gray-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-white text-2xl font-semibold">회원가입</h2>
          </div>

          <div className="w-full max-w-sm mx-auto">
            {currentStep === 'email' && (
              <>
                <button 
                  onClick={handleGoogleSignup}
                  className="w-full bg-white text-black py-3 px-4 rounded-md mb-4 flex items-center justify-center space-x-2 font-medium hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>구글 로그인</span>
                </button>
                
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-600"></div>
                  <span className="px-3 text-gray-400 text-sm">OR</span>
                  <div className="flex-1 border-t border-gray-600"></div>
                </div>
                
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="이메일을 입력해주세요!"
                    className={`w-full px-4 py-3 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                      
                      // 실시간 유효성 검사
                      if (value.trim()) {
                        const emailError = validateEmail(value);
                        setErrors({ ...errors, email: emailError });
                      } else {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    onBlur={() => {
                      // 포커스를 잃었을 때 유효성 검사
                      if (email.trim()) {
                        const emailError = validateEmail(email);
                        setErrors({ ...errors, email: emailError });
                      } else {
                        setErrors({ ...errors, email: '이메일을 입력해주세요.' });
                      }
                    }}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 text-center">{errors.email}</p>
                  )}
                </div>
                
                <button
                  onClick={handleNextStep}
                  disabled={!email.trim() || !!errors.email}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    email.trim() && !errors.email
                      ? 'bg-pink-500 text-white hover:bg-pink-600 cursor-pointer'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음
                </button>
              </>
            )}

            {currentStep === 'password' && (
              <>
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                    <span>📧</span>
                    <span>{email}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 입력해주세요!"
                      className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        
                        // 실시간 유효성 검사
                        if (value.trim()) {
                          const passwordError = validatePassword(value);
                          setErrors({ ...errors, password: passwordError });
                        } else {
                          setErrors({ ...errors, password: '' });
                        }
                      }}
                      onBlur={() => {
                        if (password.trim()) {
                          const passwordError = validatePassword(password);
                          setErrors({ ...errors, password: passwordError });
                        } else {
                          setErrors({ ...errors, password: '비밀번호를 입력해주세요.' });
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
                    <p className="mt-2 text-sm text-red-500 text-center">{errors.password}</p>
                  )}
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 한 번 입력해주세요!"
                      className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                        errors.passwordConfirm 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                      value={passwordConfirm}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPasswordConfirm(value);
                        
                        // 실시간 비밀번호 일치 검사
                        if (value.trim()) {
                          const confirmError = password !== value ? '비밀번호가 일치하지 않습니다.' : '';
                          setErrors({ ...errors, passwordConfirm: confirmError });
                        } else {
                          setErrors({ ...errors, passwordConfirm: '' });
                        }
                      }}
                      onBlur={() => {
                        if (passwordConfirm.trim()) {
                          const confirmError = password !== passwordConfirm ? '비밀번호가 일치하지 않습니다.' : '';
                          setErrors({ ...errors, passwordConfirm: confirmError });
                        } else {
                          setErrors({ ...errors, passwordConfirm: '비밀번호를 다시 입력해주세요.' });
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswordConfirm ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.passwordConfirm && (
                    <p className="mt-2 text-sm text-red-500 text-center">{errors.passwordConfirm}</p>
                  )}
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={!password.trim() || !passwordConfirm.trim() || !!errors.password || !!errors.passwordConfirm || password !== passwordConfirm}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    password.trim() && passwordConfirm.trim() && !errors.password && !errors.passwordConfirm && password === passwordConfirm
                      ? 'bg-pink-500 text-white hover:bg-pink-600 cursor-pointer'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음
                </button>
              </>
            )}

            {currentStep === 'profile' && (
              <>
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                    <span>📧</span>
                    <span>{email}</span>
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-400 text-3xl">👤</span>
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="닉네임을 입력해주세요!"
                    className={`w-full px-4 py-3 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value;
                      setName(value);
                      
                      // 실시간 유효성 검사
                      if (value.trim()) {
                        const nameError = validateName(value);
                        setErrors({ ...errors, name: nameError });
                      } else {
                        setErrors({ ...errors, name: '' });
                      }
                    }}
                    onBlur={() => {
                      if (name.trim()) {
                        const nameError = validateName(name);
                        setErrors({ ...errors, name: nameError });
                      } else {
                        setErrors({ ...errors, name: '닉네임을 입력해주세요.' });
                      }
                    }}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500 text-center">{errors.name}</p>
                  )}
                </div>

                <button
                  onClick={handleSignup}
                  disabled={!name.trim() || !!errors.name}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    name.trim() && !errors.name
                      ? 'bg-pink-500 text-white hover:bg-pink-600 cursor-pointer'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  회원가입 완료
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
