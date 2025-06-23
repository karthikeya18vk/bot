import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatBot from './pages/Chatbot';
import About from './pages/About';
import Home from './pages/Home';
import SIgnUp from './pages/SIgnUp';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
          <Link className="navbar-brand" to="/">AI ChatBot</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/chat">Chat</Link>
            <Link className="nav-link" to="/about">About</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SIgnUp />} />
    <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
