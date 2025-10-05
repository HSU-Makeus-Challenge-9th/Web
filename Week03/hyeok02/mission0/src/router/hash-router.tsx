import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Params = Record<string, string>;
export type ViewProps = { params: Params; location: { path: string } };
export type NavigateFn = (to: string, opts?: { replace?: boolean }) => void;
export type GuardFn = (navigate: NavigateFn) => boolean;
export type RouteConfig = {
  path: string;
  title: string;
  view: (props: ViewProps) => JSX.Element;
  guard?: GuardFn;
};

function ensureHash() {
  if (!window.location.hash) window.location.hash = "#/";
}
function getPath() {
  const h = window.location.hash || "#/";
  return h.replace(/^#/, "");
}
function compile(pattern: string) {
  const keys: string[] = [];
  const re = new RegExp(
    "^" +
      pattern.replace(/\/+$/, "").replace(/\/:(\w+)/g, (_m, k) => {
        keys.push(k);
        return "/([^/]+)";
      }) +
      "/?$",
    "i"
  );
  return { re, keys };
}
function match(pattern: string, pathname: string) {
  const { re, keys } = compile(pattern);
  const m = pathname.match(re);
  if (!m) return null;
  const params: Params = {};
  keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
  return params;
}

function useScrollMemory() {
  const mem = useRef<Map<string, number>>(new Map());
  const save = (p: string) => mem.current.set(p, window.scrollY);
  const restore = (p: string) => {
    const y = mem.current.get(p) ?? 0;
    requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "auto" }));
  };
  return { save, restore };
}

type Ctx = { path: string; navigate: NavigateFn };
const RouterCtx = React.createContext<Ctx | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRouter = () => {
  const ctx = React.useContext(RouterCtx);
  if (!ctx) throw new Error("useRouter must be used within <HashRouter>");
  return ctx;
};

export function HashRouter({
  routes,
  notFound,
  children,
}: PropsWithChildren<{ routes: RouteConfig[]; notFound?: React.ReactNode }>) {
  const [path, setPath] = useState<string>(() => {
    ensureHash();
    return getPath();
  });
  const { save, restore } = useScrollMemory();

  const renderCurrent = useCallback(() => setPath(getPath()), []);

  const navigate: NavigateFn = useCallback(
    (to, { replace = false } = {}) => {
      const current = getPath();
      save(current);
      const targetHash = "#" + to;

      if (replace) {
        const url = new URL(window.location.href);
        url.hash = targetHash;
        history.replaceState(null, "", url);
        renderCurrent();
        restore(to);
      } else {
        window.location.hash = targetHash;
      }
    },
    [renderCurrent, restore, save]
  );

  useEffect(() => {
    const onHash = () => {
      renderCurrent();
      restore(getPath());
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [renderCurrent, restore]);

  const element = useMemo(() => {
    for (const r of routes) {
      const params = match(r.path, path);
      if (!params) continue;

      if (typeof r.guard === "function") {
        const ok = r.guard(navigate);
        if (!ok) return null;
      }
      document.title = `${r.title} • Minimal SPA (Hash)`;
      return r.view({ params, location: { path } });
    }
    document.title = "404 • Minimal SPA (Hash)";
    return notFound ?? null;
  }, [path, routes, navigate, notFound]);

  const ctxValue = useMemo<Ctx>(() => ({ path, navigate }), [path, navigate]);

  return (
    <RouterCtx.Provider value={ctxValue}>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<{ id?: string }>(child) &&
          child.props.id === "app"
        ) {
          return React.cloneElement(child, {}, element);
        }
        return child;
      })}
    </RouterCtx.Provider>
  );
}
