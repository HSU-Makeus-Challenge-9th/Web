// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { LOCAL_STORAGE_KEY } from "../constants/key";
// import { postLogout, postSignin } from "../apis/auth";
// import type { RequestSignInDto } from "../types/auth";

// // 🚨 가정: Access Token에서 사용자 ID를 추출하는 함수가 있다고 가정합니다.
// // 실제 구현에서는 JWT 디코딩 라이브러리(예: jwt-decode)를 사용해야 합니다.
// // 토큰의 payload에서 { id: number, name: string } 형태의 객체를 반환한다고 가정합니다.
// const decodeToken = (token: string): { id: number; name: string } | null => {
//   try {
//     // 실제 JWT 디코딩 로직이 여기에 들어갑니다.
//     // 예시를 위해 단순화: 토큰의 payload를 추출하거나, 실제 디코딩 로직 구현 필요.
//     const payload = token.split(".")[1];
//     const decoded = JSON.parse(atob(payload));
//     return {
//       id: decoded.id || 0, // 디코딩된 객체에서 ID 추출
//       name: decoded.name || "",
//     };
//   } catch (e) {
//     console.error("Token decoding failed:", e);
//     return null;
//   }
// };

// interface AuthContextType {
//   accessToken: string | null;
//   refreshToken: string | null;
//   userName: string | null;
//   // 🚨 추가: userId 노출
//   userId: number | null;
//   login: (data: RequestSignInDto) => Promise<boolean>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   accessToken: null,
//   refreshToken: null,
//   userName: null,
//   // 🚨 추가: userId 초기값
//   userId: null,
//   login: async () => false,
//   logout: async () => {},
// });

// export const AuthProvider = ({ children }: PropsWithChildren) => {
//   // 1. Local Storage 훅 정의
//   const {
//     getItem: getAccessTokenFromStorage,
//     setItem: setAccessTokenInStorage,
//     removeItem: removeAccessTokenFromStorage,
//   } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
//   const {
//     getItem: getRefreshTokenFromStorage,
//     setItem: setRefreshTokenInStorage,
//     removeItem: removeRefreshTokenFromStorage,
//   } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
//   const {
//     getItem: getUserNameFromStorage,
//     setItem: setUserNameInStorage,
//     removeItem: removeUserNameFromStorage,
//   } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

//   // 🚨 **userId**를 로컬 스토리지에 직접 저장하거나, Access Token에서 추출해야 합니다.
//   // 여기서는 Access Token에서 추출하는 방식으로 구현합니다.

//   // 2. 상태 초기화: 로컬 스토리지에서 값 가져오기
//   const initialAccessToken = getAccessTokenFromStorage();
//   const initialUserName = getUserNameFromStorage();

//   const [accessToken, setAccessToken] = useState<string | null>(
//     initialAccessToken
//   );
//   const [refreshToken, setRefreshToken] = useState<string | null>(
//     getRefreshTokenFromStorage()
//   );
//   const [userName, setUserName] = useState<string | null>(initialUserName);

//   // 🚨 추가: userId 상태
//   const [userId, setUserId] = useState<number | null>(null);

//   // 3. 🚀 영속성 로직: 마운트 시 토큰 디코딩하여 userId 복구
//   useEffect(() => {
//     if (initialAccessToken) {
//       const decoded = decodeToken(initialAccessToken);
//       if (decoded && decoded.id) {
//         setUserId(decoded.id);
//         // userName이 비어있다면 토큰에서 가져온 name으로 설정 (선택적)
//         if (!initialUserName && decoded.name) {
//           setUserName(decoded.name);
//           setUserNameInStorage(decoded.name);
//         }
//       }
//     }
//   }, []);

//   const login = async (signinData: RequestSignInDto): Promise<boolean> => {
//     try {
//       const response = await postSignin(signinData);

//       if (response && response.data) {
//         const newAccessToken: string = response.data.accessToken;
//         const newRefreshToken: string = response.data.refreshToken;

//         // 🚨 **수정**: name 대신 토큰에서 ID와 name을 동시에 추출
//         const decodedUser = decodeToken(newAccessToken);
//         const newUserId: number | null = decodedUser ? decodedUser.id : null;
//         const newUserName: string = decodedUser
//           ? decodedUser.name
//           : response.data.name; // 서버 응답의 name 사용

//         // 1. 로컬 스토리지에 저장
//         setAccessTokenInStorage(newAccessToken);
//         setRefreshTokenInStorage(newRefreshToken);
//         setUserNameInStorage(newUserName);

//         // 2. 컴포넌트 상태 업데이트
//         setAccessToken(newAccessToken);
//         setRefreshToken(newRefreshToken);
//         setUserName(newUserName);
//         setUserId(newUserId); // 🚨 userId 상태 업데이트

//         alert("로그인 성공");
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error(error);
//       alert("로그인 실패");
//       return false;
//     }
//   };

//   const logout = async () => {
//     try {
//       await postLogout();

//       // 1. 로컬 스토리지에서 삭제
//       removeAccessTokenFromStorage();
//       removeRefreshTokenFromStorage();
//       removeUserNameFromStorage();

//       // 2. 컴포넌트 상태 초기화
//       setAccessToken(null);
//       setRefreshToken(null);
//       setUserName(null);
//       setUserId(null); // 🚨 userId 초기화

//       alert("로그아웃 성공");
//     } catch (error) {
//       console.error("로그아웃 오류", error);
//       alert("로그아웃 실패");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       // 🚨 value에 userId 추가
//       value={{ accessToken, refreshToken, userName, userId, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context: AuthContextType = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import type { RequestSignInDto } from "../types/auth";

const decodeToken = (token: string): { id: number; name: string } | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const decoded = JSON.parse(atob(padded));

    const userId = decoded.id || decoded.userId || decoded.sub || null;
    const userName = decoded.name || decoded.username || decoded.email || "";

    if (!userId) return null;

    return {
      id: typeof userId === "string" ? parseInt(userId, 10) : userId,
      name: userName,
    };
  } catch (e) {
    return null;
  }
};

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  userId: number | null;
  login: (data: {
    accessToken: string;
    refreshToken: string;
    name: string;
  }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  userName: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {
    getItem: getUserNameFromStorage,
    setItem: setUserNameInStorage,
    removeItem: removeUserNameFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  const {
    getItem: getUserIdFromStorage,
    setItem: setUserIdInStorage,
    removeItem: removeUserIdFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.userId || "userId");

  const initialAccessToken = getAccessTokenFromStorage();
  const initialUserName = getUserNameFromStorage();

  const [accessToken, setAccessToken] = useState<string | null>(
    initialAccessToken
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const [userName, setUserName] = useState<string | null>(initialUserName);

  const [userId, setUserId] = useState<number | null>(() => {
    const storedUserId = getUserIdFromStorage();
    if (storedUserId) {
      const id = parseInt(storedUserId, 10);
      if (!isNaN(id)) return id;
    }
    const token = getAccessTokenFromStorage();
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.id) {
        setUserIdInStorage(String(decoded.id));
        return decoded.id;
      }
    }
    return null;
  });

  const login = ({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    name: serverName,
  }: {
    accessToken: string;
    refreshToken: string;
    name: string;
  }) => {
    const decodedUser = decodeToken(newAccessToken);
    const newUserId: number | null = decodedUser ? decodedUser.id : null;
    const newUserName: string = decodedUser ? decodedUser.name : serverName;

    setAccessTokenInStorage(newAccessToken);
    setRefreshTokenInStorage(newRefreshToken);
    setUserNameInStorage(newUserName);
    if (newUserId) {
      setUserIdInStorage(String(newUserId));
    }

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setUserName(newUserName);
    setUserId(newUserId);

    alert("로그인 성공");
  };

  const logout = () => {
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    removeUserNameFromStorage();
    removeUserIdFromStorage();

    setAccessToken(null);
    setRefreshToken(null);
    setUserName(null);
    setUserId(null);

    alert("로그아웃 성공");
  };

  useEffect(() => {
    if (initialAccessToken && !userId) {
      const decoded = decodeToken(initialAccessToken);
      if (decoded && decoded.id) {
        setUserId(decoded.id);
        if (!initialUserName && decoded.name) {
          setUserName(decoded.name);
          setUserNameInStorage(decoded.name);
        }
      }
    }
  }, [initialAccessToken, initialUserName, userId]);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, userName, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context: AuthContextType = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
