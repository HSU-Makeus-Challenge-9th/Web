import type { StepProps } from "../../../types/signup";

const Step1Email = ({ formData, error, onNext, onUpdateField }: StepProps) => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = formData.email && validateEmail(formData.email);

  return (
    <>
      <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-4 mb-6 hover:bg-gray-100 transition">
        <img src="/src/assets/google.png" alt="Google" className="w-6 h-6" />
        <span className="text-black font-medium">구글 로그인</span>
      </button>

      <div className="flex items-center mb-6">
        <div className="flex-1 border-t border-gray-600"></div>
        <span className="px-4 text-gray-400 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      <form onSubmit={onNext} className="space-y-4 mb-6">
        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onUpdateField("email", e.target.value)}
            className={`w-full px-4 py-4 bg-black border rounded-lg focus:outline-none text-white ${
              error && !validateEmail(formData.email) && formData.email
                ? "border-red-500"
                : "border-white focus:border-pink-500"
            }`}
            placeholder="이메일을 입력해주세요!"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className={`w-full py-4 rounded-lg font-semibold transition ${
            isValid
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-800 text-white"
          }`}
        >
          다음
        </button>
      </form>
    </>
  );
};

export default Step1Email;
