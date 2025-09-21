import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar: React.FC = () => {
  return (
    <div className="header-container">
      <h1>YONG TODO</h1>
      <ThemeToggleButton />
    </div>
  );
};

export default Navbar;
