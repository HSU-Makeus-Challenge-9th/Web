import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import ProfileSettingsModal from "../../components/ProfileSettingsModal";
import { getProfile } from "../../apis/profile";
import { useAuthGuard } from "../../hooks/useAuthGuard";

const MyPage = () => {
  const isCheckingAuth = useAuthGuard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getProfile,
    enabled: !isCheckingAuth,
    staleTime: 1000 * 60,
  });

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  const renderContent = () => {
    if (isLoading || isCheckingAuth) {
      return (
        <div className="space-y-6">
          <div className="h-40 w-40 rounded-full bg-gray-800 animate-pulse" />
          <div className="h-6 w-48 rounded bg-gray-800 animate-pulse" />
          <div className="h-4 w-64 rounded bg-gray-800 animate-pulse" />
          <div className="h-24 w-full rounded-2xl bg-gray-900 animate-pulse" />
        </div>
      );
    }

    if (isError || !profile) {
      return (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-300">
          <p className="mb-4">
            {error instanceof Error
              ? error.message
              : "프로필 정보를 가져오지 못했습니다."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600"
          >
            다시 시도
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-800 bg-gray-900/60 p-8 text-center shadow-lg">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-gray-700 bg-gray-800 shadow-inner">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-b from-gray-900 to-gray-800 text-4xl font-semibold text-gray-400">
                {getInitials(profile.name)}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
            <p className="text-sm text-gray-400">{profile.email}</p>
          </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-full border border-pink-500 px-6 py-2 text-sm font-semibold text-pink-200 transition hover:bg-pink-500 hover:text-black"
            >
              프로필 수정
            </button>
        </div>

        <section className="rounded-3xl border border-gray-800 bg-gray-900/60 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white">자기소개</h2>
          <p className="mt-4 whitespace-pre-line text-sm text-gray-300">
            {profile.bio && profile.bio.trim().length > 0
              ? profile.bio
              : "등록된 자기소개가 없습니다."}
          </p>
        </section>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16 text-white">
        <div className="mx-auto max-w-4xl px-4 py-10">{renderContent()}</div>
      </main>
      <ProfileSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MyPage;



