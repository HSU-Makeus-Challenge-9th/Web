
import Navbar from '../components/Navbar';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">홈페이지</h1>
                <p className="text-gray-300 text-lg max-w-xl">
                    돌려돌려 LP판에 오신 것을 환영합니다. 상단의 메뉴를 통해 로그인하거나 회원가입을 진행해 보세요.
                </p>
            </main>
        </div>
    );
};

export default HomePage;

