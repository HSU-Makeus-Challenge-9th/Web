import React from "react";
import { useRouter } from "../hooks/useRouter";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
