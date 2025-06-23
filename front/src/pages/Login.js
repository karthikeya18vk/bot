import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const API_BASE_URL = 'https://ai-chat-bot-dgdr.onrender.com';

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);         // Store JWT
    localStorage.setItem("userName", response.data.name);       // Store user name
    navigate("/chat");
  } catch (err) {
    console.error("Login error:", err);
    alert(err.response?.data?.error || "Login failed");
  }
};

  return (
    <Container className="mt-5">
      <Card className="p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="mb-3"
  required
/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="mb-3"
  required
/>

          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
