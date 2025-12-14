import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateTokens } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // 이미 처리했으면 return
    if (hasProcessed.current) return;

    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const name = searchParams.get('name');

    if (accessToken && refreshToken) {
      hasProcessed.current = true;
      
      // 토큰 저장
      updateTokens(accessToken, refreshToken);
      
      // localStorage에서 저장된 리다이렉트 경로 가져오기
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      
      // 사용 후 삭제
      localStorage.removeItem('redirectAfterLogin');
      
      alert(`${name}님, 환영합니다!`);
      navigate(redirectPath, { replace: true });
    } else {
      hasProcessed.current = true;
      alert('로그인에 실패했습니다.');
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate, updateTokens]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>로그인 중...</p>
    </div>
  );
};

export default GoogleCallback;