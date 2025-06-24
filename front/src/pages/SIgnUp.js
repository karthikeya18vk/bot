import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SIgnUp = () => {
  const [step, setStep] = useState(1); // 1 = Signup, 2 = OTP
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = 'https://ai-chat-bot-dgdr.onrender.com';

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
      localStorage.setItem('email', formData.email); // optional
      setStep(2); // Move to OTP step
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    try {
      await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { email, otp });
      alert('OTP verified successfully!');
      localStorage.removeItem('email');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('OTP verification failed');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 mx-auto" style={{ maxWidth: '400px' }}>
        {step === 1 && (
          <>
            <h3 className="text-center mb-3">Signup</h3>
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Control type="text" name="name" placeholder="Name" onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">Send OTP</Button>
            </Form>
          </>
        )}

        {step === 2 && (
          <>
            <h4 className="text-center mb-3">Verify OTP</h4>
            <Form onSubmit={handleOtpSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Verify</Button>
            </Form>
          </>
        )}
      </Card>
    </Container>
  );
};

export default SIgnUp;
