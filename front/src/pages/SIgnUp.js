import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const API_BASE_URL = 'https://ai-chat-bot-dgdr.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
      alert('Registered Successfully!')
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Signup</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text" name="name" placeholder="Name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">Create Account</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUp;
