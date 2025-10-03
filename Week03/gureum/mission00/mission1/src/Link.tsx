import type { MouseEvent } from "react";
import type { LinkProps } from "./types";
import { getCurrentPath, navigateTo } from "./utils";

export const Link = ({ to, replace, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) return;

    e.preventDefault();
    if (getCurrentPath() === to) return;
    navigateTo(to, { replace });
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};
