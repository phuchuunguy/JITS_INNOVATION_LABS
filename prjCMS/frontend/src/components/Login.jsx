import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    console.log('👤 Gửi username:', form.username);
    console.log('🔑 Gửi password:', form.password);


    const response = await fetch('http://localhost:1337/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.username, password: form.password }) 
    });

    const data = await response.json(); 

    if (!response.ok || data.error) {
      setError(data.error || 'Đăng nhập thất bại');
    } else {
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/products');
    }

  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Đăng nhập</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Nhập tên đăng nhập"
            value={form.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Đăng nhập
        </Button>

        <div className="mt-3 text-center">
          Chưa có tài khoản?{' '}
          <Button variant="link" onClick={() => navigate('/register')}>
            Đăng ký
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
