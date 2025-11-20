const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const requireToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }
  return accessToken;
};

export const createComment = async (lpId: number, content: string) => {
  const accessToken = requireToken();

  const response = await fetch(`${API_BASE_URL}/v1/lps/${lpId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "댓글 생성에 실패했습니다.");
  }

  return response.json();
};

export const updateComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const accessToken = requireToken();

  const response = await fetch(
    `${API_BASE_URL}/v1/lps/${lpId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "댓글 수정에 실패했습니다.");
  }

  return response.json();
};

export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const accessToken = requireToken();

  const response = await fetch(
    `${API_BASE_URL}/v1/lps/${lpId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "댓글 삭제에 실패했습니다.");
  }

  return response.json();
};
