// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function LoginForm({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:1337/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token); // Nếu backend trả về token
        onLoginSuccess && onLoginSuccess(data);
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Lỗi máy chủ hoặc không kết nối được.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
      <h2 className="mb-3">Đăng nhập</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email"
          value={credentials.email}
          onChange={e => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập mật khẩu"
          value={credentials.password}
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">Đăng nhập</Button>
    </Form>
  );
}

export default LoginForm;
