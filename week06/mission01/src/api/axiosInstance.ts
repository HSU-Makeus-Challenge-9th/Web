import axios from 'axios';

const API_URL = 'http://localhost:8000/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// 요청 인터셉터: 모든 요청에 accessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 토큰 갱신 후 재시도
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // refreshToken이 없으면 로그아웃 처리
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        console.log('Attempting token refresh...');

        // refreshToken으로 새로운 accessToken 발급
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          { refresh: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Token refresh response:', response.data);

        // 응답 구조 확인 후 토큰 추출
        const newAccessToken = response.data.data?.accessToken || response.data.accessToken;
        const newRefreshToken = response.data.data?.refreshToken || response.data.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error('Invalid token response');
        }

        // 새로운 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        console.log('Tokens refreshed successfully');

        // 원래 요청에 새로운 토큰 적용
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError: unknown) {
        console.error('Token refresh failed:', refreshError);
        
        if (axios.isAxiosError(refreshError)) {
          console.error('Response:', refreshError.response?.data);
        }
        
        // refreshToken도 만료된 경우 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;