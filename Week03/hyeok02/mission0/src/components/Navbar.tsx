import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <nav id="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/users/42">User</NavLink>
      <NavLink to="/docs/getting-started">Docs</NavLink>
      <NavLink to="/guarded">Guarded(로그인 필요)</NavLink>
      <NavLink to="/nope">404 테스트</NavLink>
    </nav>
  );
}
