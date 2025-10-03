// hooks/useCurrentPath.ts
import { useEffect, useState } from "react";
import { getCurrentPath } from "../utils";

export function useCurrentPath() {
  const [path, setPath] = useState<string>(getCurrentPath());

  useEffect(() => {
    const onChange = () => setPath(getCurrentPath());
    window.addEventListener("popstate", onChange);
    window.addEventListener("app:navigate", onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("app:navigate", onChange);
    };
  }, []);

  return path;
}
