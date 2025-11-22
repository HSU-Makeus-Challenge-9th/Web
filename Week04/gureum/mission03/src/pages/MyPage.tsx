import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await getMyInfo();
                console.log(response);
                setData(response);
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
                setError(error instanceof Error ? error.message : '사용자 정보를 가져오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>My Page</h1>
                <div>로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>My Page</h1>
                <div className="text-red-500">에러: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div>
                <h1>My Page</h1>
                <div>사용자 정보를 찾을 수 없습니다.</div>
            </div>
        );
    }

    return (
        <div>
            <h1>My Page</h1>
            <div>{data.data.name} {data.data.email}</div>
        </div>
    );
};

export default MyPage;
