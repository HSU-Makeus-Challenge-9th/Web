import { useEffect, useMemo, useState } from "react";
import "./App.css";

type RoutePath = "/" | "/about";

function App() {
  const routes = useMemo<Record<RoutePath, string>>(
    () => ({ "/": "home", "/about": "about" }),
    []
  );

  const getPath = (): RoutePath => {
    return (
      Object.keys(routes).includes(window.location.pathname)
        ? window.location.pathname
        : "/"
    ) as RoutePath;
  };

  const [path, setPath] = useState<RoutePath>(getPath());

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath: RoutePath) => {
    if (nextPath === path) return;
    window.history.pushState({ path: nextPath }, "", nextPath);
    setPath(nextPath);
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const anchor = (e.target as HTMLElement).closest(
      "a[data-link]"
    ) as HTMLAnchorElement | null;
    if (!anchor) return;
    e.preventDefault();
    const url = new URL(anchor.href);
    const nextPath = (url.pathname || "/") as RoutePath;
    navigate(nextPath);
  };

  return (
    <div style={{ padding: 24 }} onClick={handleClick}>
      <nav style={{ marginBottom: 16 }}>
        <a
          href="/"
          data-link
          style={{
            marginRight: 12,
            fontWeight: path === "/" ? 700 : 400,
            textDecoration: path === "/" ? "underline" : "none",
          }}
        >
          Home
        </a>
        <a
          href="/about"
          data-link
          style={{
            fontWeight: path === "/about" ? 700 : 400,
            textDecoration: path === "/about" ? "underline" : "none",
          }}
        >
          About
        </a>
      </nav>
      <main style={{ fontSize: 24 }}>{routes[path]}</main>
    </div>
  );
}

export default App;
