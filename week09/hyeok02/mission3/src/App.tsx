import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./page/navbar";
import Cart from "./page/cart";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
