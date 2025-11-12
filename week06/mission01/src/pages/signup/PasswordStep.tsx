import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '../../schemas/authSchema';
import type { PasswordFormData } from '../../schemas/authSchema';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordStepProps {
  email: string;
  onNext: (data: PasswordFormData) => void;
}

const PasswordStep = ({ email, onNext }: PasswordStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  return (
    <div className="space-y-6">
      {/* 이메일 표시 */}
      <div className="flex items-center gap-2 text-white">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        <span>{email}</span>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        {/* 비밀번호 */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요!"
              {...register('password')}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <div className="relative">
            <input
              type={showPasswordCheck ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력해주세요!"
              {...register('passwordCheck')}
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
          {errors.passwordCheck && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordCheck.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isValid
              ? 'bg-pink-500 hover:bg-pink-600 text-white'
              : 'bg-gray-900 text-gray-600 cursor-not-allowed'
          }`}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default PasswordStep;