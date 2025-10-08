import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import UpcomingPage from './pages/UpcomingPage';
import TopRatedPage from './pages/TopRatedPage';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
