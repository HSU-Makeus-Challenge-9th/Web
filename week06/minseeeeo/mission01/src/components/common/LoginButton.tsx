interface LoginButtonProps {
  handleSubmit: () => void;
  isDisabled: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  handleSubmit,
  isDisabled,
}) => {
  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={isDisabled}
      className={`w-full bg-pink-500 text-gray-50 py-3 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors
      cursor-pointer ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      로그인
    </button>
  );
};

export default LoginButton;
