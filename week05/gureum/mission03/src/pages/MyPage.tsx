import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../hooks/useAuth";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { logout, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("MyPage 마운트됨, accessToken:", accessToken);
        
        if (!accessToken) {
            console.log("토큰이 없어 로그인 페이지로 이동");
            navigate("/login");
            return;
        }

        const fetchMyInfo = async () => {
            try {
                setIsLoading(true);
                console.log("사용자 정보 요청 중...");
                const response = await getMyInfo();
                console.log("사용자 정보 응답:", response);
                setData(response);
            } catch (err) {
                console.error("사용자 정보 가져오기 실패:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "사용자 정보를 불러오는 중 문제가 발생했습니다."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyInfo();
    }, [accessToken, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const userName = data?.data.name;
    const avatarUrl = data?.data.avatar ?? undefined;

    return (
        <>
            <div className="flex h-full flex-col items-center justify-center bg-black text-white">
                <h1 className="mt-6 text-xl">
                    {userName ? `${userName}님, 환영합니다!` : "마이페이지"}
                </h1>

                {isLoading && <p className="mt-4 text-sm text-gray-300">로딩 중...</p>}

                {error && (
                    <p className="mt-4 text-sm text-pink-400">에러가 발생했습니다: {error}</p>
                )}

                {!isLoading && !error && (
                    <>
                        {avatarUrl && (
                            <img
                                src={avatarUrl}
                                alt={`${userName ?? "사용자"}의 프로필 이미지`}
                                className="mt-6 h-32 w-32 rounded-full object-cover"
                            />
                        )}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="mt-8 h-10 rounded-md bg-pink-500 px-6 text-sm font-semibold hover:bg-pink-600 hover:shadow-md"
                        >
                            로그아웃
                        </button>
                    </>
                )}
            </div>
            
        </>
    );
};

export default MyPage;
