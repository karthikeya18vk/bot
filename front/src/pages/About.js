import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const About = () => (
  <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={8}>
        <Card className="shadow-lg p-4 border-0 rounded-4">
          <Card.Body>
            <div className="text-center mb-4">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
                alt="Chatbot Logo"
                width={80}
                height={80}
                roundedCircle
              />
              <h2 className="mt-3">Welcome to AI chatbot</h2>
              <p className="text-muted">
                Your intelligent assistant powered by advanced AI technology.
              </p>
            </div>

            <p>
              <strong>AI chatbot</strong> is a modern chatbot built using the powerful MERN
              (MongoDB, Express, React, Node.js) stack, integrated with leading AI models via the
              OpenRouter API.
            </p>

            <p>
              Whether you're seeking answers, brainstorming ideas, or just having a conversation,
              SmartChat provides fast and intelligent responses powered by models like DeepSeek and
              GPT-4.
            </p>

            <hr />

            <h5 className="mt-4">🛠️ Technology Stack</h5>
            <ul>
              <li><strong>Frontend:</strong> React + React Bootstrap</li>
              <li><strong>Backend:</strong> Node.js + Express.js</li>
              <li><strong>AI API:</strong> OpenRouter (with DeepSeek, Mixtral, GPT-4, etc.)</li>
            </ul>

            <h5 className="mt-4">🌐 Open Source</h5>
            <p>
              This project is open source and created for educational, experimental, and practical use.
              Contributions are welcome!
            </p>

            <h5 className="mt-4">📧 Contact</h5>
            <p>
              For feedback or contributions, contact the developer at:
              <br />
              <code>karthikeyanagothi3@gmail.com</code>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default About;
