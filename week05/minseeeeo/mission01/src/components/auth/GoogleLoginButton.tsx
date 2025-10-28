const GoogleLoginButton = () => {
  return (
    <button
      type="button"
      disabled={false}
      className="w-full text-white border border-gray-200 py-3 rounded-md text-lg font-medium transition-colors cursor-pointer hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed flex items-center justify-center relative"
    >
      <img
        src="https://img.icons8.com/color/512/google-logo.png"
        className="w-6 h-6 absolute left-4"
      ></img>
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;
