// App.tsx
import React from "react";
import { Home, About, Contact } from "./component/Pages";
import { useRouter } from "./hooks/useRouter";
import { Link } from "./route/Link";
import { Route } from "./route/route";
import { Router } from "./route/Router";

const Navigation: React.FC = () => {
  const { currentPath } = useRouter();

  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">홈</Link> |<Link to="/about">소개</Link> |
      <Link to="/contact">연락처</Link>
      <p>현재 경로: {currentPath}</p>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <main style={{ padding: "20px" }}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </main>
    </Router>
  );
};

export default App;
