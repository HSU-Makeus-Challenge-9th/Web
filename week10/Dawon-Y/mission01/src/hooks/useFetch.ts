import { useState, useEffect, useRef } from 'react';
import { axiosClient } from '../api/axiosClient';
import type { AxiosRequestConfig } from 'axios';

export const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // options의 깊은 비교를 위한 ref
  const optionsRef = useRef<string>('');

  useEffect(() => {
    // options를 JSON 문자열로 변환하여 비교
    const optionsString = JSON.stringify(options);
    
    // 이전 options와 동일하면 실행하지 않음
    if (optionsRef.current === optionsString) {
      return;
    }
    
    optionsRef.current = optionsString;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get<T>(url, options);
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [url, options]);

  return { data, isLoading };
};