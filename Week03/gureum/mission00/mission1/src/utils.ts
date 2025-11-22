// utils.ts
export const getCurrentPath = (): string => window.location.pathname;

export const navigateTo = (
  to: string,
  options?: { replace?: boolean; state?: any }
) => {
  const method: "pushState" | "replaceState" = options?.replace ? "replaceState" : "pushState";
  window.history[method](options?.state ?? {}, "", to);
  window.dispatchEvent(new Event("app:navigate")); // 커스텀 라우팅 이벤트
};
