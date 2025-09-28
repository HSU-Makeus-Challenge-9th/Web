import { useMemo } from "react";
import { useRouter } from "../router/hash-router";

function isActive(current: string, to: string) {
  if (to === "/") return current === "/";
  return current === to || (to !== "/" && current.startsWith(to));
}

type Props = { to: string; children: React.ReactNode };

export default function NavLink({ to, children }: Props) {
  const { path, navigate } = useRouter();
  const active = useMemo(() => isActive(path, to), [path, to]);

  return (
    <a
      data-link
      href={`#${to}`}
      className={active ? "active" : undefined}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
