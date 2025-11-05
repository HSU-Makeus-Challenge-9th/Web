// // import { createContext, PropsWithChildren, useContext, useState } from "react";
// // import { useLocalStorage } from "../hooks/useLocalStorage";
// // import { LOCAL_STORAGE_KEY } from "../constants/key";
// // import { postLogout, postSignin } from "../apis/auth";
// // import type { RequestSignInDto } from "../types/auth";

// // interface AuthContextType {
// //   accessToken: string | null;
// //   refreshToken: string | null;
// //   login: (data: RequestSignInDto) => Promise<void>;
// //   logout: () => Promise<void>;
// // }

// // export const AuthContext = createContext<AuthContextType>({
// //   accessToken: null,
// //   refreshToken: null,
// //   login: async () => {},
// //   logout: async () => {},
// // });

// // export const AuthProvider = ({ children }: PropsWithChildren) => {
// //   const {
// //     getItem: getAccessTokenFromStorage,
// //     setItem: setAccessTokenInStorage,
// //     removeItem: removeAccessTokenFromStorage,
// //   } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
// //   const {
// //     getItem: getRefreshTokenFromStorage,
// //     setItem: setRefreshTokenInStorage,
// //     removeItem: removeRefreshTokenFromStorage,
// //   } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

// //   const [accessToken, setAccessToken] = useState<string | null>(
// //     getAccessTokenFromStorage()
// //   );
// //   const [refreshToken, setRefreshToken] = useState<string | null>(
// //     getRefreshTokenFromStorage()
// //   );

// //   const login = async (signinData: RequestSignInDto) => {
// //     try {
// //       const data = await postSignin(signinData);

// //       if (data) {
// //         const newAccessToken: string = data.data.accessToken;
// //         const newRefreshToken: string = data.data.refreshToken;

// //         setAccessTokenInStorage(newAccessToken);
// //         setRefreshTokenInStorage(newRefreshToken);

// //         setAccessToken(newAccessToken);
// //         setRefreshToken(newRefreshToken);
// //         alert("로그인 성공");
// //         window.location.href = "/";
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert("로그인 실패");
// //     }
// //   };

// //   const logout = async () => {
// //     try {
// //       await postLogout();
// //       removeAccessTokenFromStorage();
// //       removeRefreshTokenFromStorage();
// //       setAccessToken(null);
// //       setRefreshToken(null);
// //       alert("로그아웃 성공");
// //     } catch (error) {
// //       console.error("로그아웃 오류", error);
// //       alert("로그아웃 실패");
// //     }
// //   };
// //   return (
// //     <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context: AuthContextType = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error("AuthContext를 찾을 수 없습니다.");
// //   }
// //   return context;
// // };

// import { createContext, PropsWithChildren, useContext, useState } from "react";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { LOCAL_STORAGE_KEY } from "../constants/key";
// import { postLogout, postSignin } from "../apis/auth";
// import type { RequestSignInDto } from "../types/auth";

// interface AuthContextType {
//   accessToken: string | null;
//   refreshToken: string | null;
//   // 🚀 MODIFIED: login 함수가 Promise<boolean>을 반환하도록 변경 (성공 여부)
//   login: (data: RequestSignInDto) => Promise<boolean>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   accessToken: null,
//   refreshToken: null,
//   // 🚀 MODIFIED: 반환 타입 변경
//   login: async () => false,
//   logout: async () => {},
// });

// export const AuthProvider = ({ children }: PropsWithChildren) => {
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

//   const [accessToken, setAccessToken] = useState<string | null>(
//     getAccessTokenFromStorage()
//   );
//   const [refreshToken, setRefreshToken] = useState<string | null>(
//     getRefreshTokenFromStorage()
//   );

//   // 🚀 MODIFIED: 로그인 성공 후 페이지 이동 로직 제거
//   const login = async (signinData: RequestSignInDto): Promise<boolean> => {
//     try {
//       const data = await postSignin(signinData);

//       if (data) {
//         const newAccessToken: string = data.data.accessToken;
//         const newRefreshToken: string = data.data.refreshToken;

//         setAccessTokenInStorage(newAccessToken);
//         setRefreshTokenInStorage(newRefreshToken);

//         setAccessToken(newAccessToken);
//         setRefreshToken(newRefreshToken);
//         alert("로그인 성공");
//         return true; // 성공 시 true 반환
//       }
//       return false;
//     } catch (error) {
//       console.error(error);
//       alert("로그인 실패");
//       return false; // 실패 시 false 반환
//     }
//   };

//   const logout = async () => {
//     try {
//       await postLogout();
//       removeAccessTokenFromStorage();
//       removeRefreshTokenFromStorage();
//       setAccessToken(null);
//       setRefreshToken(null);
//       alert("로그아웃 성공");
//     } catch (error) {
//       console.error("로그아웃 오류", error);
//       alert("로그아웃 실패");
//     }
//   };
//   return (
//     <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
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
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import type { RequestSignInDto } from "../types/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  login: (data: RequestSignInDto) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  userName: null,
  login: async () => false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // 토큰 관련 Local Storage
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

  // ⭐️ 추가: userName 관련 Local Storage 훅
  const {
    getItem: getUserNameFromStorage,
    setItem: setUserNameInStorage,
    removeItem: removeUserNameFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.userName); // LOCAL_STORAGE_KEY.userName 키 필요

  // 상태 초기화: 로컬 스토리지에서 값 가져오기
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  // ⭐️ 수정: userName도 로컬 스토리지에서 값 가져와 초기화
  const [userName, setUserName] = useState<string | null>(
    getUserNameFromStorage()
  );

  const login = async (signinData: RequestSignInDto): Promise<boolean> => {
    try {
      const response = await postSignin(signinData);

      if (response && response.data) {
        const newAccessToken: string = response.data.accessToken;
        const newRefreshToken: string = response.data.refreshToken;
        const newUserName: string = response.data.name;

        // 1. 로컬 스토리지에 저장
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setUserNameInStorage(newUserName); // ⭐️ userName 영구 저장

        // 2. 컴포넌트 상태 업데이트
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setUserName(newUserName);

        alert("로그인 성공");
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
      return false;
    }
  };

  const logout = async () => {
    try {
      await postLogout();

      // 1. 로컬 스토리지에서 삭제
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserNameFromStorage(); // ⭐️ userName 삭제

      // 2. 컴포넌트 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);
      setUserName(null);

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, userName, login, logout }}
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
