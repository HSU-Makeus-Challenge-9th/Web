import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuthCheck = (isAuthenticated: boolean, isLoading: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownAlert = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasShownAlert.current) {
      hasShownAlert.current = true;
      const shouldRedirect = window.confirm(
        '로그인이 필요한 서비스입니다. 로그인을 해주세요!'
      );
      if (shouldRedirect) {
        navigate('/login', {
          state: { from: location.pathname },
          replace: true,
        });
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  return { shouldRender: isAuthenticated || isLoading };
};