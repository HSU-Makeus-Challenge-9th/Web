import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from '../../mission03/src/pages/MovieDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* 기존 라우트들 */}
          <Route path="/" element={<MoviePage />} />
          <Route path="/popular" element={<MoviePage />} />
          <Route path="/now-playing" element={<MoviePage />} />
          <Route path="/top-rated" element={<MoviePage />} />
          <Route path="/upcoming" element={<MoviePage />} />
          
          {/* 영화 상세 페이지 - 동적 라우팅 */}
          <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;