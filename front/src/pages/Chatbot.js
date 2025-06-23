import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Container,
  Form,
  Button,
  Card,
  Spinner,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [currentReply, setCurrentReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user name from localStorage (assuming it was saved during login)
    const name = localStorage.getItem("userName"); 
    if (name) setUserName(name);
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setCurrentReply("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        messages: newMessages,
      });

      const fullReply = res.data.reply;
      let index = 0;

      const typeInterval = setInterval(() => {
        setCurrentReply((prev) => prev + fullReply.charAt(index));
        index++;
        if (index >= fullReply.length) {
          clearInterval(typeInterval);
          setMessages((prev) => [
            ...prev,
            { role: "bot", content: fullReply },
          ]);
          setCurrentReply("");
          setLoading(false);
        }
      }, 5);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">🤖 AI ChatBot</h2>

          {messages.length === 0 && userName && (
            <Alert variant="info" className="text-center">
              👋 Welcome, <strong>{userName}</strong>! Start your conversation below.
            </Alert>
          )}

          <Card
            className="p-3 shadow-sm rounded"
            style={{ height: "500px", overflowY: "auto" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex my-2 ${
                  msg.role === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded px-3 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-light"
                  }`}
                  style={{ maxWidth: "75%", whiteSpace: "pre-wrap" }}
                >
                  <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {currentReply && (
              <div className="d-flex justify-content-start my-2">
                <div
                  className="p-2 bg-light rounded px-3"
                  style={{ maxWidth: "75%", whiteSpace: "pre-wrap" }}
                >
                  <strong>Bot:</strong>{" "}
                  <ReactMarkdown>{currentReply}</ReactMarkdown>
                </div>
              </div>
            )}

            {loading && (
              <div className="d-flex justify-content-start align-items-center mt-2">
                <Spinner animation="border" size="sm" className="me-2" />
                <em>Bot is typing...</em>
              </div>
            )}
          </Card>

          <Form
            className="d-flex mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Form.Control
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="me-2"
            />
            <Button type="submit" variant="primary">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;


