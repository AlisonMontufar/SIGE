import Login from './components/Auth/Login';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';

function App() {

  const navigate = useNavigate();
  
    useEffect(() => {
      navigate('/login');
    }, [navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
