import { useEffect, useState } from "react";
import { getCurrentPath } from "./utils";

export function useCurrentPath() {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handler = () => setPath(getCurrentPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return path;
}
