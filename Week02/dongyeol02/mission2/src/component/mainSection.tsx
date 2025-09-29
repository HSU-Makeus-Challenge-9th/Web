import { useTheme } from "../hook/useTheme";

const MainSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`h-[1000px] w-full transition-colors duration-300 flex flex-col justify-center items-center ${
        isDarkMode ? "bg-slate-600" : "bg-sky-200"
      }`}
    >
      <div className="text-center space-y-4">
        <p
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-slate-700"
          }`}
        >
          다크모드 상태: {String(isDarkMode)}
        </p>
        <p
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-800"
          }`}
        >
          {isDarkMode ? "다크모드🌙 실행 중" : "라이트모드 ☀️ 실행 중"}
        </p>
      </div>
    </div>
  );
};

export default MainSection;
