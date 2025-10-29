interface LoginButtonProps {
  handleSubmit: () => Promise<void> | void;
  isDisabled: boolean;
  isLoading?: boolean;
  label?: string;
}

const LoginButton = ({ handleSubmit, isDisabled, isLoading = false, label = "로그인" }: LoginButtonProps) => {
  const handleClick = () => {
    if (isDisabled) return;
    const result = handleSubmit();
    if (result instanceof Promise) {
      void result.catch((error) => {
        console.error("로그인 처리 중 오류가 발생했습니다.", error);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-full py-3 rounded-md font-medium transition-colors ${
        isDisabled ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-pink-500 text-white hover:bg-pink-600"
      }`}
    >
      {isLoading ? "처리중..." : label}
    </button>
  );
};

export default LoginButton;
