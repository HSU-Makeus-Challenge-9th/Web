import './App.css';
import { Link, Route, Routes } from './router';

const WebPage = () => (
  <div style={{ 
    backgroundColor: '#e3f2fd', 
    minHeight: '100vh', 
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h1 style={{ color: '#1976d2' }}>웹 페이지</h1>
  </div>
);

const WendyPage = () => (
  <div style={{ 
    backgroundColor: '#fce4ec', 
    minHeight: '100vh', 
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h1 style={{ color: '#c2185b' }}>웬디 페이지</h1>
  </div>
);

const HansungPage = () => (
  <div style={{ 
    backgroundColor: '#e8f5e8', 
    minHeight: '100vh', 
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h1 style={{ color: '#2e7d32' }}>한성 페이지</h1>
  </div>
);

const NotFoundPage = () => (
  <div style={{ 
    backgroundColor: '#fff3e0', 
    minHeight: '100vh', 
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h1 style={{ color: '#f57c00' }}>404</h1>
  </div>
);

const Header = () => {
  return (
    <nav className="header__nav">
      <span className="header__link header__link--web">
        <Link to='/web'>WEB</Link>
      </span>
      <span className="header__link header__link--wendy">
        <Link to='/wendy'>WENDY</Link>
      </span>
      <span className="header__link header__link--hansung">
        <Link to='/hansung'>HANSUNG</Link>
      </span>
      <span className="header__link header__link--notfound">
        <Link to='/not-found'>NOT FOUND</Link>
      </span>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/web' component={WebPage} />
        <Route path='/wendy' component={WendyPage} />
        <Route path='/hansung' component={HansungPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;