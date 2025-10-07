import { useNavigate } from 'react-router-dom';
import { signIn } from '../apis/auth';
import { useLocalStorage } from './useLocalStorage';
import type { LoginData, LoginResponse } from '../types/auth/login';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setItem: setAccessToken, removeItem: removeAccessToken } =
    useLocalStorage('accessToken');
  const { setItem: setRefreshToken, removeItem: removeRefreshToken } =
    useLocalStorage('refreshToken');
  const { setItem: setUser, removeItem: removeUser } = useLocalStorage('user');

  const login = async (data: LoginData) => {
    try {
      console.log('로그인 시도:', data);
      const response: LoginResponse = await signIn(data);

      if (response.status) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setUser({
          id: response.data.id,
          name: response.data.name,
        });

        console.log('로그인 성공:', response.message);
        navigate('/');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUser();
    navigate('/login');
  };

  return { login, logout };
};
