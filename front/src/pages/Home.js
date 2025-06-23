import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // refresh to update UI
  };

  return (
    <Container className="mt-5 text-center">
      <Row className="align-items-center">
        <Col md={6}>
          <h1 className="display-4 fw-bold">AI Chatbot</h1>
          <p className="lead text-muted">
            Your intelligent assistant and OpenRouter AI models.
          </p>
          <p>
            Ask questions, get instant answers, or explore creative ideas —
            all with the power of cutting-edge AI.
          </p>

          {!isLoggedIn ? (
            <>
              <Button
                variant="outline-secondary"
                size="lg"
                className="mt-3 me-3 px-4 py-2 rounded-pill"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="outline-success"
                size="lg"
                className="mt-3 px-4 py-2 rounded-pill"
                onClick={() => navigate('/signup')}
              >
                Signup
              </Button>
            </>
          ) : (
            <Button
              variant="danger"
              size="lg"
              className="mt-3 me-3 px-4 py-2 rounded-pill"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}

          <Button
            variant="primary"
            size="lg"
            className="mt-3 ms-2 px-4 py-2 rounded-pill"
            onClick={() => navigate('/chat')}
          >
            Start Chatting
          </Button>
        </Col>
        <Col md={6} className="mt-4 mt-md-0">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="ChatBot Illustration"
            fluid
            style={{ maxHeight: '300px' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

