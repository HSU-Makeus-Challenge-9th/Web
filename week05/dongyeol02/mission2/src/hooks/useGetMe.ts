import { useState, useEffect } from "react";
import { getMe } from "../api/apis";
import type { myRespopnse } from "../types/my";
import { useLocalStorage } from "./useLocalStorage";

export function useGetMe() {
  const [data, setData] = useState<myRespopnse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [accessToken] = useLocalStorage<string>("accessToken", "");
  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    getMe(accessToken)
      .then((response) => setData(response))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [accessToken]);

  return { data, loading, error };
}
