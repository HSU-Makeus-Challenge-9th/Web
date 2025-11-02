import type { AuthPayload, AuthState } from "../../types/auth/auth";

const KEY = {
  access: "accessToken",
  refresh: "refreshToken",
  name: "name",
} as const;

const AUTH_JSON_KEY = "auth";

export const loadAuth = (): AuthState => {
  const raw = localStorage.getItem(AUTH_JSON_KEY);
  if (raw) {
    try {
      const obj = JSON.parse(raw);
      return {
        accessToken: obj?.accessToken ?? null,
        refreshToken: obj?.refreshToken ?? null,
        name: obj?.name ?? null,
      };
    } catch {}
  }

  const accessToken = localStorage.getItem(KEY.access);
  const refreshToken = localStorage.getItem(KEY.refresh);
  const name = localStorage.getItem(KEY.name);
  return {
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
    name: name ?? null,
  };
};

export const saveAuth = (p: Partial<AuthPayload>) => {
  const current = loadAuth();
  const next: AuthState = {
    accessToken: p.accessToken ?? current.accessToken,
    refreshToken: p.refreshToken ?? current.refreshToken,
    name: p.name ?? current.name,
  };
  localStorage.setItem(AUTH_JSON_KEY, JSON.stringify(next));

  if (next.accessToken != null)
    localStorage.setItem(KEY.access, next.accessToken);
  if (next.refreshToken != null)
    localStorage.setItem(KEY.refresh, next.refreshToken);
  if (next.name != null) localStorage.setItem(KEY.name, next.name);
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_JSON_KEY);
  localStorage.removeItem(KEY.access);
  localStorage.removeItem(KEY.refresh);
  localStorage.removeItem(KEY.name);
};
