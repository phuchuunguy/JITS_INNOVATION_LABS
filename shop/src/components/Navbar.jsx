import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <nav>
        <Link to="/products">Sản phẩm</Link>
        <Link to="/add">Thêm sản phẩm</Link>
        <Link to="/about">Giới thiệu</Link>
      </nav>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'light' ? '🌙 Chế độ tối' : '☀️ Chế độ sáng'}
      </button>
    </header>
  );
}
