import { HashRouter, type RouteConfig } from "./router/hash-router";
import NavBar from "./components/Navbar";
import { Home, About, User, Docs, Guarded, NotFound } from "./views";

const routes: RouteConfig[] = [
  { path: "/", title: "Home", view: () => <Home /> },
  { path: "/about", title: "About", view: () => <About /> },
  { path: "/users/:id", title: "User", view: (p) => <User {...p} /> },
  { path: "/docs/:slug", title: "Docs", view: (p) => <Docs {...p} /> },
  {
    path: "/guarded",
    title: "Guarded",
    view: () => <Guarded />,
    guard: (navigate) => {
      const ok = localStorage.getItem("hasAuth") === "1";
      if (!ok) {
        alert("로그인이 필요합니다. 홈으로 이동합니다.");
        navigate("/", { replace: true });
      }
      return ok;
    },
  },
];

export default function App() {
  return (
    <HashRouter routes={routes} notFound={<NotFound />}>
      <header>
        <strong>Minimal SPA (Hash Router)</strong>
        <NavBar />
      </header>
      <main id="app" aria-live="polite" />
    </HashRouter>
  );
}
