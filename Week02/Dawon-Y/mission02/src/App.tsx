
import ThemeContent from './components/ThemeContent';
import Navbar from './components/Navbar';
import ThemeProvider from './contexts/ThemeContext';
import useTheme from './contexts/useTheme';
import './index.css';

function App() {
  // ThemeProvider 내부에서 useTheme 사용
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-500 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
    >
      <Navbar />
      <ThemeContent />
    </div>
  );
}

export default App;