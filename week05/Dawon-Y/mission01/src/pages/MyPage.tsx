const MyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔒 마이페이지</h1>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">내 정보</h2>
          <p className="text-gray-300 mb-2">이메일: abcd@naver.com</p>
          <p className="text-gray-300">이름: 삶아먹을 감자</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;