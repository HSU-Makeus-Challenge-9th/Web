import type { MouseEvent } from 'react';
import type { LinkProps } from '../types';
import { navigateTo } from '../utils';
import { useCurrentPath } from '../hooks/useCurrentPath';

export const Link = ({ to, children }: LinkProps) => {
  const path = useCurrentPath();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Link component: ', to);
    console.log('path === to -> ', path);
    if (path === to) return;
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};