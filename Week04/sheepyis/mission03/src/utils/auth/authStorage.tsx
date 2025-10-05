import type { AuthPayload, AuthState } from "../../types/auth/auth";

const KEY = {
  access: "accessToken",
  refresh: "refreshToken",
  name: "name",
} as const;

export const saveAuth = (p: Partial<AuthPayload>) => {
  if (p.accessToken != null) localStorage.setItem(KEY.access, p.accessToken);
  if (p.refreshToken != null) localStorage.setItem(KEY.refresh, p.refreshToken);
  if (p.name != null) localStorage.setItem(KEY.name, p.name);
};

export const loadAuth = (): AuthState => {
  const accessToken = localStorage.getItem(KEY.access);
  const refreshToken = localStorage.getItem(KEY.refresh);
  const name = localStorage.getItem(KEY.name);
  return {
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
    name: name ?? null,
  };
};

export const clearAuth = () => {
  localStorage.removeItem(KEY.access);
  localStorage.removeItem(KEY.refresh);
  localStorage.removeItem(KEY.name);
};
