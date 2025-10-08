import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

// 1. 라우트 객체 생성
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // 레이아웃 역할을 하는 부모 컴포넌트
    errorElement: <NotFoundPage />, // 자식 경로를 포함한 모든 라우팅 에러 처리
    children: [
      {
        // 기본 경로 (예: /)
        index: true,
        element: <MoviePage />,
      },
      {
        // 동적 경로 (예: /movies/popular, /movies/top_rated)
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        // 상세 페이지 경로 (예: /movies/12345)
        path: "movies/:movie_id",
        element: <MovieDetailPage />,
      },
      // 참고: 이 설정은 /movies/popular 경로가 MoviePage로 가고,
      // /movies/12345 경로가 MovieDetailPage로 가게끔 명시적으로 지정한 것입니다.
    ],
  },
]);

function App() {
  return (
    // 2. RouterProvider로 라우트 객체 주입
    <RouterProvider router={router} />
  );
}

export default App;
