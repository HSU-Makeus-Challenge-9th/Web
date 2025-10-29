export const LOCAL_STORAGE_KEYS = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
} as const;

// 이전 코드 호환을 위해 단수 형태도 함께 export 합니다.
export const LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEYS;
