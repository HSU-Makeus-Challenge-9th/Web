import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './page/navbar';
import Cart from './page/cart';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cart />} />

      </Routes>
    </Router>
  );
};

export default App;
