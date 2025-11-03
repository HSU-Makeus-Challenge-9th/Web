import { useState, useEffect } from "react";
import { getMe } from "../api/apis";
import type { myRespopnse } from "../types/my";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useGetMe() {
  const [data, setData] = useState<myRespopnse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      getMe(accessToken)
        .then((response) => setData(response))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return { data, loading, error };
}
