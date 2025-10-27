interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = "에러가 발생했습니다.",
}: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="text-red-600 text-2xl font-bold mb-2">{message}</div>
        <div className="text-gray-500 text-sm">잠시 후 다시 시도해주세요.</div>
      </div>
    </div>
  );
}
