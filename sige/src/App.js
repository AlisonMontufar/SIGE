import React, { useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/Login'; 

function Home() {
  const navigate = useNavigate();  


  useEffect(() => {

    navigate('/Login');
  }, [navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;