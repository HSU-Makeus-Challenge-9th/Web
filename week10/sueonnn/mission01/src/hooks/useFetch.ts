import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import axiosClient from "../api/axios-client";

export const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || options?.params?.query === "") {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(url, options);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};
