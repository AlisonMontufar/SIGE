import React, { useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Home from './components/PortalInicial/home'

function Homero() {
  const navigate = useNavigate();  

  useEffect(() => {
  
    navigate('/');
  }, [navigate]);

  return null;    
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
