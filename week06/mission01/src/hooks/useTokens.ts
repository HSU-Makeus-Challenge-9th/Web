import { useState, useEffect } from 'react';

export function useTokens() {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });
  
  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    return localStorage.getItem('refreshToken');
  });

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem('accessToken'));
      setRefreshToken(localStorage.getItem('refreshToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      const currentAccessToken = localStorage.getItem('accessToken');
      if (currentAccessToken !== accessToken) {
        setAccessToken(currentAccessToken);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [accessToken]);

  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
  };

  return {
    accessToken,
    refreshToken,
    setTokens,
    clearTokens,
  };
}