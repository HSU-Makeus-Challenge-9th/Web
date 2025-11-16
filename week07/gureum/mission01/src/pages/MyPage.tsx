import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyInfo, updateUserInfo } from "../apis/auth";
import { uploadImage } from "../apis/lp";
import { useAuth } from "../hooks/useAuth";
import type { ResponseMyInfoDto } from "../types/auth";
import { ArrowLeft, Settings } from "lucide-react";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editBio, setEditBio] = useState('');
    const [editAvatar, setEditAvatar] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    
    const { logout, accessToken } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 이미지 업로드 mutation
    const uploadImageMutation = useMutation({
        mutationFn: (file: File) => uploadImage(file),
        onSuccess: (data) => {
            setUploadedImageUrl(data.data.imageUrl);
        },
        onError: (error: any) => {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
        },
    });

    // 유저 정보 수정 mutation (낙관적 업데이트)
    const updateUserMutation = useMutation({
        mutationFn: updateUserInfo,
        // 서버 요청 전에 즉시 UI 업데이트
        onMutate: async (newUserInfo) => {
            // 진행 중인 쿼리 취소
            await queryClient.cancelQueries({ queryKey: ['userInfo'] });
            
            // 이전 데이터 백업 (롤백용)
            const previousData = data;
            
            // 즉시 UI 업데이트 (낙관적 업데이트)
            if (data) {
                const optimisticData = {
                    ...data,
                    data: {
                        ...data.data,
                        name: newUserInfo.name || data.data.name,
                        bio: newUserInfo.bio !== undefined ? newUserInfo.bio : data.data.bio,
                        avatar: newUserInfo.avatar || data.data.avatar,
                    }
                };
                setData(optimisticData);
                console.log('🚀 낙관적 업데이트: 닉네임 즉시 변경', newUserInfo.name);
            }
            
            // 롤백을 위해 이전 데이터 반환
            return { previousData };
        },
        onSuccess: () => {
            // 서버 응답 성공 시 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            setIsEditModalOpen(false);
            alert('프로필이 성공적으로 수정되었습니다.');
            console.log('✅ 서버 업데이트 완료');
        },
        onError: (error: any, _variables, context) => {
            // 실패 시 이전 데이터로 롤백
            if (context?.previousData) {
                setData(context.previousData);
                console.log('⏪ 롤백: 이전 상태로 복구');
            }
            console.error('프로필 수정 실패:', error);
            alert(error.response?.data?.message || '프로필 수정에 실패했습니다.');
        },
    });

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

    const handleOpenEditModal = () => {
        if (data?.data) {
            setEditName(data.data.name);
            setEditBio(data.data.bio || '');
            setEditAvatar(data.data.avatar || '');
            setPreviewUrl(data.data.avatar || null);
            setUploadedImageUrl(data.data.avatar || null);
        }
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setPreviewUrl(null);
        setUploadedImageUrl(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // 미리보기용 base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            
            // 서버에 이미지 업로드
            uploadImageMutation.mutate(file);
        }
    };

    const handleSaveProfile = () => {
        if (!editName.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }

        updateUserMutation.mutate({
            name: editName.trim(),
            bio: editBio.trim() || undefined,
            avatar: uploadedImageUrl || undefined,
        });
    };

    const userName = data?.data.name;
    const avatarUrl = data?.data.avatar ?? undefined;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    돌아가기
                </button>
                
                <div className="flex flex-col items-center">
                    {/* 프로필 정보 */}
                    <div className="relative">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={`${userName ?? "사용자"}의 프로필 이미지`}
                                className="h-32 w-32 rounded-full object-cover border-4 border-gray-700"
                            />
                        ) : (
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-700">
                                {userName?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <h1 className="mt-6 text-2xl font-bold">
                        {userName || "사용자"}
                    </h1>

                    {data?.data.bio && (
                        <p className="mt-2 text-gray-400 text-center max-w-md">
                            {data.data.bio}
                        </p>
                    )}

                    <p className="mt-2 text-gray-500 text-sm">
                        {data?.data.email}
                    </p>

                    {isLoading && <p className="mt-4 text-sm text-gray-300">로딩 중...</p>}

                    {error && (
                        <p className="mt-4 text-sm text-pink-400">에러가 발생했습니다: {error}</p>
                    )}

                    {!isLoading && !error && (
                        <>
                            <div className="mt-8 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleOpenEditModal}
                                    className="flex items-center gap-2 h-10 rounded-md bg-gray-700 px-6 text-sm font-semibold hover:bg-gray-600 hover:shadow-md transition-colors"
                                >
                                    <Settings className="w-4 h-4" />
                                    프로필 수정
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="h-10 rounded-md bg-pink-500 px-6 text-sm font-semibold hover:bg-pink-600 hover:shadow-md transition-colors"
                                >
                                    로그아웃
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 프로필 수정 모달 */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="relative w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
                        {/* 닫기 버튼 */}
                        <button
                            onClick={handleCloseEditModal}
                            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-xl font-bold text-white mb-6">프로필 수정</h2>

                        {/* 프로필 이미지 */}
                        <div className="mb-6 flex justify-center">
                            <div className="relative">
                                <label htmlFor="avatar-upload" className="cursor-pointer">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="프로필 미리보기"
                                            className="h-32 w-32 rounded-full object-cover border-4 border-gray-700 hover:border-pink-500 transition-colors"
                                        />
                                    ) : (
                                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-700 hover:border-pink-500 transition-colors">
                                            {editName?.charAt(0).toUpperCase() || '?'}
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 right-0 bg-pink-500 rounded-full p-2 hover:bg-pink-600 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {uploadImageMutation.isPending && (
                            <p className="text-center text-sm text-gray-400 mb-4">이미지 업로드 중...</p>
                        )}

                        {/* 이름 입력 */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                이름 <span className="text-pink-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="이름을 입력하세요"
                                className="w-full rounded-md bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>

                        {/* Bio 입력 */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                소개
                            </label>
                            <textarea
                                value={editBio}
                                onChange={(e) => setEditBio(e.target.value)}
                                placeholder="자기소개를 입력하세요 (선택사항)"
                                rows={4}
                                className="w-full rounded-md bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                            />
                        </div>

                        {/* 버튼 영역 */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleCloseEditModal}
                                className="flex-1 rounded-md bg-gray-600 py-3 text-white hover:bg-gray-500 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                disabled={!editName.trim() || updateUserMutation.isPending || uploadImageMutation.isPending}
                                className={`flex-1 rounded-md py-3 text-white transition-colors ${
                                    editName.trim() && !updateUserMutation.isPending && !uploadImageMutation.isPending
                                        ? "bg-pink-500 hover:bg-pink-600"
                                        : "bg-gray-600 cursor-not-allowed"
                                }`}
                            >
                                {updateUserMutation.isPending ? '저장 중...' : '저장'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>

    );
};

export default MyPage;
