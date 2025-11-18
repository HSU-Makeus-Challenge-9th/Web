import type { StepProps } from "../../../types/signup";

const Step3Name = ({ formData, error, onNext, onUpdateField }: StepProps) => {
  const isValid = formData.name && formData.name.length >= 2;

  return (
    <form onSubmit={onNext} className="space-y-4">
      <div className="flex items-center gap-2 mb-6 text-white">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
        <span>{formData.email}</span>
      </div>

      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onUpdateField("name", e.target.value)}
          className="w-full px-4 py-4 bg-black border border-white rounded-lg focus:outline-none focus:border-pink-500 text-white"
          placeholder="이름을 입력해주세요!"
        />
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

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
  );
};

export default Step3Name;