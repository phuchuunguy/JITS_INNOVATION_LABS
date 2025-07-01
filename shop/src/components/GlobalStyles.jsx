import React from 'react';

export default function GlobalStyles() {
  return (
    <style>{`
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        transition: background-color 0.3s, color 0.3s;
      }

      .app-container.light {
        background: #f4f6f8;
        color: #333;
      }

      .app-container.dark {
        background: #1e1e1e;
        color: #eee;
      }

      .navbar {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background: #ccc;
      }

      .navbar a {
        margin-right: 1rem;
        text-decoration: none;
        color: inherit;
      }

      .theme-toggle-btn {
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #aaa;
        background: none;
        color: inherit;
      }
    `}</style>
  );
}
