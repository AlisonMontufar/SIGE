import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Home from './components/PortalInicial/home';
import InicioAdministrador from './components/Encuestas/Administrador/InicioAdministrador';
import AgregarEncuesta from './components/Encuestas/Administrador/AgregarEncuesta';
import GestionarEncuestas from './components/Encuestas/Administrador/GestionarEncuestas';
import InicioAlumno from './components/Encuestas/Alumno/InicioAlumno';
import Encuesta from './components/Encuestas/Alumno/Encuesta';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para login */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta para el Home */}
        <Route path="/Home" element={<Home />} />

        {/* Rutas de administrador */}
        <Route path="/admin" element={<InicioAdministrador />} />
        <Route path="/admin/agregar-encuesta" element={<AgregarEncuesta />} />
        <Route path="/admin/gestionar-encuestas" element={<GestionarEncuestas />} />

        {/* Rutas de alumno */}
        <Route path="/alumno" element={<InicioAlumno />} />
        <Route path="/alumno/encuesta/:id" element={<Encuesta />} />
      </Routes>
    </Router>
  );
}

export default App;