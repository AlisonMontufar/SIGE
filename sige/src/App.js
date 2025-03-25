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
import EnvModCalificaciones from './components/HistorialAcademico/Env-Mod-calificaciones';

// Importa las vistas de actividades extracurriculares
import InicioActividadesExtracurriculares from './components/ActividadesExtracurriculares/InicioActividadesExtracurriculares';
import AgregarActividadExtracurricular from './components/ActividadesExtracurriculares/AgregarActividadExtracurricular';
import GestionarActividadesExtracurriculares from './components/ActividadesExtracurriculares/GestionarActividadesExtracurriculares';
import VerActividadExtracurricular from './components/ActividadesExtracurriculares/VerActividadExtracurricular'; // Nuevo componente

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para login */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta para el portal inicial */}
        <Route path="/home" element={<Home />} />
        
        {/* Ruta para el Historial Academico */}
        <Route path="/HistorialAcademico" element={<EnvModCalificaciones />} />
        
        {/* Rutas de administrador */}
        <Route path="/admin" element={<InicioAdministrador />} />
        <Route path="/admin/agregar-encuesta" element={<AgregarEncuesta />} />
        <Route path="/admin/gestionar-encuestas" element={<GestionarEncuestas />} />
        
        {/* Rutas de alumno */}
        <Route path="/alumno" element={<InicioAlumno />} />
        <Route path="/alumno/encuesta/:id" element={<Encuesta />} />
        
        {/* Rutas para Actividades Extracurriculares */}
        <Route path="/admin/actividades" element={<InicioActividadesExtracurriculares />} />
        <Route path="/admin/agregar-actividad" element={<AgregarActividadExtracurricular />} />
        <Route path="/admin/gestionar-actividades" element={<GestionarActividadesExtracurriculares />} />
        <Route path="/admin/actividad/:id" element={<VerActividadExtracurricular />} />
      </Routes>
    </Router>
  );
}

export default App;
