import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Modal from "./Modal";
import {
  getProfile,
  updateProfile,
  type UpdateProfilePayload,
  type UserProfile,
} from "../apis/profile";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (profile: UserProfile) => void;
}

const emptyForm = {
  name: "",
  bio: "",
  avatar: "",
};

const ProfileSettingsModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ProfileSettingsModalProps) => {
  const queryClient = useQueryClient();
  const [formValues, setFormValues] = useState(emptyForm);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getProfile,
    enabled: isOpen,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (profile && isOpen) {
      setFormValues({
        name: profile.name ?? "",
        bio: profile.bio ?? "",
        avatar: profile.avatar ?? "",
      });
      setValidationError(null);
    } else if (!isOpen) {
      setFormValues(emptyForm);
      setValidationError(null);
    }
  }, [profile, isOpen]);

  const mutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      localStorage.setItem("userName", updatedProfile.name);
      if (updatedProfile.id) {
        localStorage.setItem("userId", updatedProfile.id.toString());
      }
      onSuccess?.(updatedProfile);
      onClose();
    },
    onError: (mutationError: Error) => {
      setValidationError(mutationError.message);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedName = formValues.name.trim();
    if (!trimmedName) {
      setValidationError("이름은 필수 항목입니다.");
      return;
    }

    const payload: UpdateProfilePayload = {
      name: trimmedName,
      bio: formValues.bio.trim() ? formValues.bio.trim() : null,
      avatar: formValues.avatar.trim() ? formValues.avatar.trim() : null,
    };

    mutation.mutate(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">프로필 설정</h2>
          <p className="text-sm text-gray-400">
            이름, 자기소개, 프로필 이미지를 업데이트하세요.
          </p>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-gray-700 animate-pulse" />
            <div className="space-y-3">
              <div className="h-12 rounded-xl bg-gray-800 animate-pulse" />
              <div className="h-24 rounded-xl bg-gray-800 animate-pulse" />
              <div className="h-12 rounded-xl bg-gray-800 animate-pulse" />
            </div>
          </div>
        ) : isError ? (
          <div className="space-y-6">
            <p className="text-sm text-red-400">
              {error instanceof Error
                ? error.message
                : "프로필 정보를 불러오지 못했습니다."}
            </p>
            <button
              type="button"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["currentUser"] })
              }
              className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200"
              >
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-200"
              >
                Bio <span className="text-xs text-gray-400">(선택)</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formValues.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                placeholder="자기소개를 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-200"
              >
                프로필 이미지 URL{" "}
                <span className="text-xs text-gray-400">(선택)</span>
              </label>
              <input
                id="avatar"
                name="avatar"
                type="url"
                value={formValues.avatar}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                placeholder="https://example.com/profile.jpg"
              />
              <p className="text-xs text-gray-500">
                빈 칸으로 두면 저장 시 프로필 이미지가 제거됩니다.
              </p>
            </div>

            {validationError && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                {validationError}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-600 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mutation.isPending && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                저장
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ProfileSettingsModal;

