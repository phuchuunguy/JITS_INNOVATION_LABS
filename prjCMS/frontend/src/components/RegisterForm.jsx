// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function RegisterForm() {
  const [info, setInfo] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch('http://localhost:1337/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Đăng ký thành công! Bạn có thể đăng nhập.');
        setInfo({ name: '', email: '', password: '' });
      } else {
        setError(data.message || 'Đăng ký thất bại.');
      }
    } catch (err) {
      setError('Không thể kết nối máy chủ.');
    }
  };

  return (
    <Form onSubmit={handleRegister} className="p-4 border rounded shadow bg-white">
      <h2 className="mb-3">Đăng ký</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Họ tên</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên"
          value={info.name}
          onChange={e => setInfo({ ...info, name: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email"
          value={info.email}
          onChange={e => setInfo({ ...info, email: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Mật khẩu"
          value={info.password}
          onChange={e => setInfo({ ...info, password: e.target.value })}
          required
        />
      </Form.Group>

      <Button type="submit" variant="success" className="w-100">Đăng ký</Button>
    </Form>
  );
}

export default RegisterForm;

