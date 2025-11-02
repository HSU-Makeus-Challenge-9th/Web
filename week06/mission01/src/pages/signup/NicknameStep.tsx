import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nicknameSchema } from '../../schemas/authSchema';
import type { NicknameFormData } from '../../schemas/authSchema';

interface NicknameStepProps {
  onSubmit: (data: NicknameFormData) => void;
  isLoading: boolean;
}

const NicknameStep = ({ onSubmit, isLoading }: NicknameStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
  });

  return (
    <div className="space-y-6">
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요!"
            {...register('nickname')}
            className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-white placeholder-gray-500"
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isValid && !isLoading
              ? 'bg-pink-500 hover:bg-pink-600 text-white'
              : 'bg-gray-900 text-gray-600 cursor-not-allowed'
          }`}
        >
          {isLoading ? '회원가입 중...' : '회원가입 완료'}
        </button>
      </form>
    </div>
  );
};

export default NicknameStep;