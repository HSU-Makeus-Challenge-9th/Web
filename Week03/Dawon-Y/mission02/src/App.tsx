import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviePage />} />
          <Route path="popular" element={<MoviePage />} />
          <Route path="now-playing" element={<MoviePage />} />
          <Route path="top-rated" element={<MoviePage />} />
          <Route path="upcoming" element={<MoviePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;