import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserContent({ userId }: { userId: number }) {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

  const { data, isPending, isError } = useQuery<User>({
    queryKey: ['user', userId],
    
    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal }); 
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
      return response.json();
    },

    retry: 3, 
    
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * Math.pow(2, attemptIndex), 30000); 
    },
    
    staleTime: 5 * 60 * 1000, 
    
    gcTime: 10 * 60 * 1000, 
  });

  if (isPending) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        fontSize: '24px'
      }}>
        로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        fontSize: '24px'
      }}>
        응 에러야 고쳐
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '400',
          marginBottom: '20px',
          letterSpacing: '0.5px'
        }}>
          {data?.name}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#999',
          fontWeight: '300'
        }}>
          {data?.email}
        </p>
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginTop: '10px'
        }}>
          User ID: {data?.id}
        </p>
      </div>
    </div>
  );
}

export const UserDataDisplay = () => {
  const [userId, setUserId] = useState(5);
  const [showContent, setShowContent] = useState(true);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff'
    }}>
      <div style={{
        padding: '20px',
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => setUserId(prev => prev === 10 ? 1 : prev + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          다른 사용자 불러오기
        </button>
        <button
          onClick={() => setShowContent(prev => !prev)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          언마운트 테스트
        </button>
        <button
          onClick={() => setUserId(11)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff8c00',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          게시도 테스트 (404 에러)
        </button>
      </div>

      {showContent ? (
        <UserContent userId={userId} />
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          fontSize: '24px',
          color: '#666'
        }}>
          컴포넌트가 언마운트되었습니다
        </div>
      )}
    </div>
  );
};