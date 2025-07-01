import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import GlobalStyles from './components/GlobalStyles';

import ProductListPage from './pages/Products';
import AddProductPage from './pages/AddProduct';
import AboutPage from './pages/About';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <GlobalStyles />
      <div className={`app-container ${theme}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/add" element={<AddProductPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
